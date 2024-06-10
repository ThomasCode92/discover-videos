import Head from 'next/head';
import { Fragment } from 'react';

import Navbar from '@/components/Navbar';
import SectionCards from '@/components/SectionCards';

import styles from '@/styles/MyList.module.css';

export default function MyList() {
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
          videos={[]}
          size="small"
        />
      </main>
    </Fragment>
  );
}
