import Link from 'next/link';

interface IconBtnProps {
  href: string;
  alt: string;
  children?: React.ReactNode;
}

const IconBtn = ({ href, children }: IconBtnProps) => {
  return (
    <div>
      <Link href={href}>{children}</Link>
    </div>
  );
};

export default IconBtn;
