import { Fragment } from 'react';
import Head from 'next/head';

import Banner from '@/components/Banner';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';

export default function Home() {
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
      <Card imageUrl="/static/clifford.jpg" size="large" />
      <Card imageUrl="/static/clifford.png" />
      <Card size="small" />
    </Fragment>
  );
}
