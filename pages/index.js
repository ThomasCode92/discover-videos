import { Fragment } from 'react';
import Head from 'next/head';

import Banner from '@/components/Banner';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Discover Videos</title>
        <meta name="description" content="Seamless video exploration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Netflix</h1>
      <Banner
        title="Clifford the red dog"
        subTitle="a very cute dog"
        imgUrl="/static/clifford.jpg"
      />
    </Fragment>
  );
}
