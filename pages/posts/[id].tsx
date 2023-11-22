import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';

export interface PostProps {
    id?: string;
    contentHtml?: string;
    title?: string;
    date?: string;
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    try {
        if (!params || !params.id) {
            return {
                notFound: true,
            };
        }

        const postData = await getPostData(params.id);

        if (!postData) {
            return {
                notFound: true,
            };
        }

        return {
            props: postData,
        };
    } catch (error) {
        console.error('Error fetching post data:', error);

        return {
            notFound: true,
        };
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Post({ title, date, contentHtml }: PostProps) {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </article>
        </Layout>
    );
}
