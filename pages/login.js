import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/Login.module.css';
import netflixLogo from '@/public/static/netflix.svg';

export default function Login() {
  return (
    <div>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header>
        <Link href="/">
          <div className={styles['logo-link']}>
            <Image src={netflixLogo} alt="Netflix logo" fill={true} />
          </div>
        </Link>
      </header>
    </div>
  );
}
