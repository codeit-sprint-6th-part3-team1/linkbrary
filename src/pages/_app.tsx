import AuthContext from '@/context/AuthContext';
import '@/styles/normalize.css';
import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';

import '@/styles/index.scss';
import '@/styles/normalize.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <Component {...pageProps} />
    </AuthContext>
  );
}
