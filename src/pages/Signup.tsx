import styles from './Signup.module.scss';
import Link from 'next/link';
import LogoIcon from './components/LogoIcon';
import Label from './components/Label';

export default function Signup() {
  return (
    <div className={styles.container}>
      <main className={styles.signupContainer}>
        <form className={styles.signupForm}>
          <div className={styles.formTitleContainer}>
            <div className={styles.formTitleWrap}>
              <Link className={styles.formLogo} href="/">
                <LogoIcon />
              </Link>
              <p className={styles.formTitle}>
                이미 회원이신가요? <Link href="/signup">로그인 하기</Link>
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
            <div className={styles.inputWrap}>
              <Label className={styles.inputLabel}>비밀번호 확인</Label>
              <div className={styles.inputBackground}>
                {/* 인풋 컴포넌트  */}
                <input type="password" placeholder="내용 입력" />
              </div>
            </div>
          </div>
          <button className={styles.formButton}>회원가입</button>
        </form>
      </main>
    </div>
  );
}
