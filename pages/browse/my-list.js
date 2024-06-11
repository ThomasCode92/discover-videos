import Head from 'next/head';
import { Fragment } from 'react';

import Navbar from '@/components/Navbar';
import SectionCards from '@/components/SectionCards';

import { getFavouredVideos } from '@/lib/videos';
import verifyToken from '@/utils/verify-token';

import styles from '@/styles/MyList.module.css';

export default function MyList({ favouredVideos }) {
  return (
    <Fragment>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <SectionCards
          className={styles['section-cards']}
          title="My list"
          videos={favouredVideos}
          size="small"
          shouldWrap
          shouldScale={false}
        />
      </main>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies?.token ?? null;
  const userId = verifyToken(token);

  if (!token || !userId)
    return { redirect: { destination: '/login', permanent: false } };

  const favouredVideos = await getFavouredVideos(token, userId);

  return { props: { favouredVideos } };
}
