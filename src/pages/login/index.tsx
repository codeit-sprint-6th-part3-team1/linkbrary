import { useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '@/lib/axios';
import Cookies from 'js-cookie';
import styles from './style.module.scss';
import Link from 'next/link';
import LogoIcon from '../components/LogoIcon';
import KakaoIcon from '../components/KakaoIcon';
import GoogleIcon from '../components/GoogleIcon';
import Label from '../components/Label';
import { signIn } from 'next-auth/react';

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { email, password } = values;
    try {
      const response = await axiosInstance.post('/auth/sign-in', { email, password });
      if (response.status === 200) {
        const { accessToken } = response.data;
        Cookies.set('accessToken', accessToken, { path: '/' });
        alert('Login successful');
        router.push('/link');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('An unexpected error occurred');
    }
  };

  // const handleGoogleSignIn = () => {
  //   signIn('google');
  // };

  return (
    <div className={styles.container}>
      <main className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formHeaderContainer}>
            <div className={styles.formHeaderWrap}>
              <Link className={styles.formLogo} href="/">
                <LogoIcon />
              </Link>
              <div className={styles.formTitleContainer}>
                <p className={styles.formTitle}>회원이 아니신가요?</p>
                <div className={styles.titleLinkWrap}>
                  <Link className={styles.titleLink} href="/signup">
                    회원 가입하기
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputWrap}>
              <Label className={styles.inputLabel} htmlFor="email">
                이메일
              </Label>
              <div className={styles.inputBackground}>
                {/* 인풋 컴포넌트  */}
                <input id="email" name="email" type="text" placeholder="내용 입력" value={values.email} onChange={handleChange} />
              </div>
            </div>
            <div className={styles.inputWrap}>
              <Label className={styles.inputLabel} htmlFor="password">
                비밀번호
              </Label>
              <div className={styles.inputBackground}>
                {/* 인풋 컴포넌트  */}
                <input id="password" name="password" type="password" placeholder="내용 입력" value={values.password} onChange={handleChange} />
              </div>
            </div>
          </div>
          <button type="submit" className={styles.formButton}>
            로그인
          </button>
        </form>
        <div className={styles.easyLoginContainer}>
          <p className={styles.easyLoginTitle}>소셜 로그인</p>
          <div className={styles.easyLoginButtonWrap}>
            <button className={styles.easyLoginButton}>
              <GoogleIcon />
            </button>
            <button className={styles.easyLoginButton}>
              <KakaoIcon />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
