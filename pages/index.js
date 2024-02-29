import { Fragment } from 'react';
import Head from 'next/head';

import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
import SectionCards from '@/components/SectionCards';

import { getPopularVideos, getVideos } from '@/lib/videos';
import styles from '@/styles/Home.module.css';

export default function Home({
  disneyVideos,
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

export async function getServerSideProps() {
  const disneyVideos = await getVideos();
  const travelVideos = await getVideos('travel');
  const productivityVideos = await getVideos('productivity');
  const popularVideos = await getPopularVideos();

  return {
    props: { disneyVideos, travelVideos, productivityVideos, popularVideos },
  };
}
