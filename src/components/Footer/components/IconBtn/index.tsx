import Link from 'next/link';

interface IconBtnProps {
  href: string;
  children?: React.ReactNode;
}

function IconBtn({ href, children }: IconBtnProps) {
  return (
    <div>
      <Link href={href}>{children}</Link>
    </div>
  );
}

export default IconBtn;
