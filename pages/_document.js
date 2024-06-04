import Providers from '@/context/Providers';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Providers>
          <Main />
        </Providers>
        <NextScript />
      </body>
    </Html>
  );
}
