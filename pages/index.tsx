import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';
import { SortedPostData, getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';
import { GetStaticProps } from 'next';

interface HomeProps {
    allPostsData: SortedPostData[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
};

export default function Home({ allPostsData }: HomeProps) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>Hello, I'm Kendra. I've been a software developer for 6 years. I have two semesters left before graduating with my Software Developer degree from BYU-I.</p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li
                            className={utilStyles.listItem}
                            key={id}
                        >
                            <Link href={`/posts/${id}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}





