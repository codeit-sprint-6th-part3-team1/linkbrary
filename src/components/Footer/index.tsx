import Link from 'next/link';
import s from './style.module.scss';
import IconBtn from './components/IconBtn';
import FacebookIcon from './assets/FacebookIcon';
import TwitterIcon from './assets/TwitterIcon';
import YoutubeIcon from './assets/YoutubeIcon';
import InstagramIcon from './assets/InstagramIcon';

const iconSize = 20;

export default function Footer() {
  return (
    <div className={s.footer}>
      <div className={s.container}>
        {/* TODO : Have to change the className... */}
        <div className={s.test}>
          <div className={s.copyright}>©codeit - 2023</div>
          <div className={s.contract_wrapper}>
            <Link href={''} className={s.contract}>
              Privacy Policy
            </Link>
            <div style={{ width: '30px' }}></div>
            <Link href={''} className={s.contract}>
              FAQ
            </Link>
          </div>
        </div>

        <div className={s.sns_wrapper}>
          <IconBtn href={'https://www.facebook.com/'} alt={''}>
            <FacebookIcon width={iconSize} height={iconSize} />
          </IconBtn>
          <IconBtn href={'https://www.facebook.com/'} alt={''}>
            <TwitterIcon width={iconSize} height={iconSize} />
          </IconBtn>
          <IconBtn href={'https://www.facebook.com/'} alt={''}>
            <YoutubeIcon width={iconSize} height={iconSize} />
          </IconBtn>
          <IconBtn href={'https://www.facebook.com/'} alt={''}>
            <InstagramIcon width={iconSize} height={iconSize} />
          </IconBtn>
        </div>
      </div>
    </div>
  );
}
