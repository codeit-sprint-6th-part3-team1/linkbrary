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
import InputBox from '@/components/InputBox';
import { InputTypes } from '@/constants/inputTypes';

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value: string) => emailRegex.test(value);
  const validatePassword = (value: string) => value.length >= 8;

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === 'email') {
      setEmailError(!validateEmail(value));
      setEmailErrorMessage('이메일 형식으로 작성해 주세요.');
      if (value === '') {
        setEmailError(true);
        setEmailErrorMessage('이메일을 입력해주세요.');
      }
    } else if (name === 'password') {
      setPasswordError(!validatePassword(value));
      setPasswordErrorMessage('8자 이상 입력해주세요.');
      if (value === '') {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호를 입력해주세요.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { email, password } = values;
    try {
      const response = await axiosInstance.post('/auth/sign-in', { email, password });
      if (response.status === 200) {
        const { accessToken } = response.data;
        Cookies.set('accessToken', accessToken, { path: '/' });
        router.push('/links');
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        const errorMessage: string = error.response.data.message;
        setEmailError(true);
        setEmailErrorMessage(errorMessage);
      } else if (error.response && error.response.status === 401) {
        const errorMessage: string = error.response.data.message;
        setPasswordError(true);
        setPasswordErrorMessage(errorMessage);
      }
    }
  };

  // const handleGoogleSignIn = () => {
  //   signIn('google');
  // };

  // 로그인시 다시 들어갔을때, 토큰 있을떄, 토큰으로 인증으로

  return (
    <div className={styles.container}>
      <main className={styles.loginContainer}>
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
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <div className={styles.inputWrap}>
              <Label className={styles.inputLabel} htmlFor="email">
                이메일
              </Label>
              <InputBox
                type={InputTypes.EMAIL}
                value={values.email}
                err={emailError}
                errMsg={emailErrorMessage}
                onValueChange={(value) => handleChange('email', value)}
              />
            </div>
            <div className={styles.inputWrap}>
              <Label className={styles.inputLabel} htmlFor="password">
                비밀번호
              </Label>
              <InputBox
                type={InputTypes.PASSWORD}
                value={values.password}
                err={passwordError}
                errMsg={passwordErrorMessage}
                onValueChange={(value) => handleChange('password', value)}
              />
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
