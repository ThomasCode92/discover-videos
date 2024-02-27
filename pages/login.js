import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/styles/Login.module.css';
import netflixLogo from '@/public/static/netflix.svg';

export default function Login() {
  const handleLoginWithEmail = async event => {
    event.preventDefault();

    console.log('Login with email...');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <div className={styles['logo-link']}>
            <Image src={netflixLogo} alt="Netflix logo" fill={true} />
          </div>
        </Link>
      </header>

      <main className={styles.main}>
        <form className={styles['login-form']}>
          <h1 className={styles['login-header']}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles['email-input']}
          />

          <p className={styles['user-message']}></p>
          <button
            className={styles['login-btn']}
            onClick={handleLoginWithEmail}
          >
            Sign In
          </button>
        </form>
      </main>
    </div>
  );
}
