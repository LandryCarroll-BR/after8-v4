import Head from 'next/head';
import Script from 'next/script';
import { RawHtml } from '../raw-html/raw-html';

export function SiteHead({ children }: any) {
  return (
    <>
      <Head>
        <title>After 8 Band</title>
        <RawHtml html={children} />
      </Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-L8115CKYDR" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-L8115CKYDR');
        `}
      </Script>
    </>
  );
}
