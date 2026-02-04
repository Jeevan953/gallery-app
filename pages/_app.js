import '../styles/globals.css';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}
