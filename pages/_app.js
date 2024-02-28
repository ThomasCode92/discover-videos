import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import localFont from 'next/font/local';

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
  const router = useRouter();

  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (!isLoggedIn) return router.push('/login');

      router.push('/');
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    handleLoggedIn();

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <main className={myFont.className}>
      {isLoading ? <div>Loading...</div> : <Component {...pageProps} />}
    </main>
  );
}
