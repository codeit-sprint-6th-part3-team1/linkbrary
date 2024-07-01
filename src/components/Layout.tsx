import { ReactNode } from 'react';

import RecoilRootWrapper from './RecoilWrapper';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <RecoilRootWrapper>
        <Header />
        {children}
        <Footer />
      </RecoilRootWrapper>
    </div>
  );
};

export default Layout;
