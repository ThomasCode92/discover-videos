import Head from 'next/head';
import { Fragment } from 'react';

import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
import SectionCards from '@/components/SectionCards';

import { getPopularVideos, getVideos, getWatchedVideos } from '@/lib/videos';
import verifyToken from '@/utils/verify-token';

import styles from '@/styles/Home.module.css';

export default function Home({
  disneyVideos,
  watchedVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) {
  return (
    <Fragment>
      <Head>
        <title>Discover Videos</title>
        <meta name="description" content="Seamless video exploration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        videoId="4zH5iYM4wJo"
        imgUrl="/static/clifford.jpg"
      />

      <div className={styles.videos}>
        <SectionCards title="Disney" size="large" videos={disneyVideos} />
        <SectionCards
          title="Watch it again"
          size="small"
          videos={watchedVideos}
        />
        <SectionCards title="Travel" size="small" videos={travelVideos} />
        <SectionCards
          title="Productivity"
          size="medium"
          videos={productivityVideos}
        />
        <SectionCards title="Popular" size="small" videos={popularVideos} />
      </div>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies?.token ?? null;
  const userId = verifyToken(token);

  if (!token || !userId)
    return { redirect: { destination: '/login', permanent: false } };

  const disneyVideos = await getVideos();
  const watchedVideos = await getWatchedVideos(token, userId);
  const travelVideos = await getVideos('travel');
  const productivityVideos = await getVideos('productivity');
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      watchedVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
    },
  };
}
