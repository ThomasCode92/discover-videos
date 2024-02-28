import { useEffect } from 'react';
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
  const router = useRouter();

  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();

      if (!isLoggedIn) return router.push('/login');

      router.push('/');
    };

    handleLoggedIn();
  }, []);

  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
