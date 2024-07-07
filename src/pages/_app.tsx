import '@/styles/normalize.css';

import type { AppProps } from 'next/app';
import AuthContext from '@/context/AuthContext';

import Layout from '@/components/Layout';

import '@/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext>
  );
}
