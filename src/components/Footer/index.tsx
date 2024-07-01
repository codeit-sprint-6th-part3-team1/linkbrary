import Link from 'next/link';
import s from './style.module.scss';
import IconBtn from './components/IconBtn';
import FacebookIcon from '../../../public/assets/footer/FacebookIcon';
import TwitterIcon from '../../../public/assets/footer/TwitterIcon';
import YoutubeIcon from '../../../public/assets/footer/YoutubeIcon';
import InstagramIcon from '../../../public/assets/footer/InstagramIcon';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.copyright}>©codeit - 2023</div>
        <div className={s.contractList}>
          {/* TODO : 링크 연결 */}
          <Link href={'/privacypolicy'} className={s.contract}>
            Privacy Policy
          </Link>
          {/* TODO : 링크 연결 */}
          <Link href={'/faq'} className={s.contract}>
            FAQ
          </Link>
        </div>
        {/* TODO : SNS 링크 연결 */}
        <div className={s.snsList}>
          <IconBtn href={'https://www.facebook.com/'} alt={'facebook icon'}>
            <FacebookIcon />
          </IconBtn>
          <IconBtn href={'https://www.twitter.com/'} alt={'x icon'}>
            <TwitterIcon />
          </IconBtn>
          <IconBtn href={'https://www.youtube.com/'} alt={'youtube icon'}>
            <YoutubeIcon />
          </IconBtn>
          <IconBtn href={'https://www.instagram.com/'} alt={'instagram icon'}>
            <InstagramIcon />
          </IconBtn>
        </div>
      </div>
    </footer>
  );
}
