import localFont from 'next/font/local';

import '@/styles/globals.css';

const myFont = localFont({ src: '../fonts/RobotoSlab.ttf' });

export default function App({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
