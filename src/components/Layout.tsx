import { ReactNode } from 'react';

import RecoilRootWrapper from './RecoilWrapper';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <RecoilRootWrapper>{children}</RecoilRootWrapper>
    </div>
  );
};

export default Layout;
