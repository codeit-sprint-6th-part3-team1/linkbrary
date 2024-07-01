import '@/styles/index.scss';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

// NOTE 음~ 모르겠다~~
// const noLayoutPaths = ['/', '/404'];

// const getContent = () => {
//   if (noLayoutPaths.includes(pageProps?.page?.path || '')) {
//     return <Component {...pageProps} />;
//   }
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// };
