import localFont from 'next/font/local';

import '@/styles/globals.css';

const myFont = localFont({
  src: [
    { path: '../fonts/RobotoSlab-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/RobotoSlab-Bold.ttf', weight: '700', style: 'normal' },
  ],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
