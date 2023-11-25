import { PropsWithChildren } from 'react';
import Head from 'next/head';
import Footer from '@/components/features/Footer';

function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Head>
        <title>Star Wars characters</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/sw-icon.svg" />
      </Head>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default RootLayout;
