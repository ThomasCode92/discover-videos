import Head from 'next/head';
import { Fragment } from 'react';

import Navbar from '@/components/Navbar';
import SectionCards from '@/components/SectionCards';

export default function MyList() {
  return (
    <Fragment>
      <Head>
        <title>My List</title>
      </Head>
      <main>
        <Navbar />
        <SectionCards title="My list" videos={[]} size="small" />
      </main>
    </Fragment>
  );
}
