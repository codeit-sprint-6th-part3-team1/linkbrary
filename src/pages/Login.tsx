import styles from './Login.module.scss';
import Link from 'next/link';
import LogoIcon from './components/LogoIcon';
import KakaoIcon from './components/KakaoIcon';
import GoogleIcon from './components/GoogleIcon';
import Label from './components/Label';

export default function Login() {
  return (
    <div className={styles.container}>
      <main className={styles.loginContainer}>
        <form className={styles.loginForm}>
          <div className={styles.formTitleContainer}>
            <div className={styles.formTitleWrap}>
              <Link className={styles.formLogo} href="/">
                <LogoIcon />
              </Link>
              <p className={styles.formTitle}>
                회원이 아니신가요? <Link href="/signup">회원 가입하기</Link>
              </p>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputWrap}>
              <Label className={styles.inputLabel}>이메일</Label>
              <div className={styles.inputBackground}>
                {/* 인풋 컴포넌트  */}
                <input type="text" placeholder="내용 입력" />
              </div>
            </div>
            <div className={styles.inputWrap}>
              <Label className={styles.inputLabel}>비밀번호</Label>
              <div className={styles.inputBackground}>
                {/* 인풋 컴포넌트  */}
                <input type="password" placeholder="내용 입력" />
              </div>
            </div>
          </div>
          <button className={styles.formButton}>로그인</button>
        </form>
        <div className={styles.easyLoginContainer}>
          <p className={styles.easyLoginTitle}>소셜 로그인</p>
          <div className={styles.easyLoginButtonWrap}>
            <Link href="" className={styles.easyLoginButton}>
              <GoogleIcon />
            </Link>
            <Link href="" className={styles.easyLoginButton}>
              <KakaoIcon />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
