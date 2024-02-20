import { Fragment } from 'react';
import Head from 'next/head';

import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
import SectionCards from '@/components/SectionCards';

import { getVideos } from '@/lib/videos';

export default function Home({ disneyVideos }) {
  return (
    <Fragment>
      <Head>
        <title>Discover Videos</title>
        <meta name="description" content="Seamless video exploration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar username="Thomas@netflix.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.jpg"
      />

      <SectionCards title="Disney" size="large" videos={disneyVideos} />
      <SectionCards title="Disney" size="medium" videos={disneyVideos} />
      <SectionCards title="Disney" size="small" videos={disneyVideos} />
    </Fragment>
  );
}

export async function getServerSideProps() {
  const disneyVideos = getVideos();

  return { props: { disneyVideos } };
}
