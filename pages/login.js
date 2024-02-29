import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Router from 'next/router';

import { magic } from '@/lib/magic';

import styles from '@/styles/Login.module.css';
import netflixLogo from '@/public/static/netflix.svg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  const handleOnChangeEmail = event => {
    const inputValue = event.target.value;
    setUserMessage(undefined);
    setEmail(inputValue);
  };

  const handleLoginWithEmail = async event => {
    event.preventDefault();

    if (email === '') return setUserMessage('Please enter your email address');

    if (email !== process.env.NEXT_PUBLIC_TEST_EMAIL)
      return console.log('Invalid email');

    setIsLoading(true);

    try {
      await magic.auth.loginWithMagicLink({ email });
      Router.push('/');
    } catch (error) {
      setIsLoading(false);
      console.error('Something went wrong logging in', error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Sign In</title>
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
            onChange={handleOnChangeEmail}
          />

          {userMessage && (
            <p className={styles['user-message']}>{userMessage}</p>
          )}
          <button
            className={styles['login-btn']}
            onClick={handleLoginWithEmail}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </main>
    </div>
  );
}
