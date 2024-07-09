import '@/styles/normalize.css';

import type { AppProps } from 'next/app';
import AuthContext from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RecoilRoot } from 'recoil';

import Layout from '@/components/layout/Layout';

import '@/styles/index.scss';

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>{' '}
      </QueryClientProvider>
    </AuthContext>
  );
}
