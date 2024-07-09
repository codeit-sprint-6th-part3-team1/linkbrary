import type { ReactNode } from 'react';

import s from './style.module.scss';

const SignLayout = ({ children }: { children: ReactNode }) => (
  <div className={s.container}>
    <main className={s.mainWrapper}>{children}</main>
  </div>
);

export default SignLayout;
