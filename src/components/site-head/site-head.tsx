import Head from 'next/head';
import Script from 'next/script';
import parse from 'html-react-parser';

export function SiteHead({ children }: any) {
  console.log(children);
  return (
    <>
      <Head>{parse(children)}</Head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
    </>
  );
}
