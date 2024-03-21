import { useEffect, useState } from 'react';
import Router from 'next/router';
import localFont from 'next/font/local';

import Loading from '@/components/Loading';

import { magic } from '@/lib/magic';

import '@/styles/globals.css';

const myFont = localFont({
  src: [
    { path: '../fonts/RobotoSlab-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/RobotoSlab-Bold.ttf', weight: '700', style: 'normal' },
  ],
});

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (!isLoggedIn) return Router.push('/login');

      Router.push('/');
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    handleComplete();

    // handleLoggedIn();

    return () => {
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <main className={myFont.className}>
      {isLoading ? <Loading /> : <Component {...pageProps} />}
    </main>
  );
}
