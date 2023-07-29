import '../../faust.config';
import '../styles/globals.css';

import React from 'react';

import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import { AppProps } from 'next/app';
import { Blink } from '@/components';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <div className="dark flex min-h-screen flex-col scroll-smooth bg-background font-sans text-foreground antialiased">
        <Component {...pageProps} key={router.asPath} />
        <Blink />
      </div>
    </FaustProvider>
  );
}
