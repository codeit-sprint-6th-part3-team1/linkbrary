import Link from 'next/link';
import s from './style.module.scss';

interface IconBtnProps {
  href: string;
  alt: string;
  children?: React.ReactNode;
}

const IconBtn = ({ href, children }: IconBtnProps) => {
  return (
    <div className={s.icon}>
      <Link href={href}>{children}</Link>
    </div>
  );
};

export default IconBtn;
