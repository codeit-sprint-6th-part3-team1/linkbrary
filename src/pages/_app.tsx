import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';

import '@/styles/index.scss';
import '@/styles/normalize.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
