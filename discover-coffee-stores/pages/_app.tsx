import type { AppProps } from 'next/app';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {/* <footer>
        <p>© 2022 kim-hyunjin</p>
      </footer> */}
    </>
  );
}

export default MyApp;
