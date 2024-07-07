import { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';

import axiosInstance from '@/libs/axios';

import { InputTypes } from '@/constants/inputTypes';

import InputBox from '@/components/InputBox';

import GoogleIcon from '../components/GoogleIcon';
import KakaoIcon from '../components/KakaoIcon';
import Label from '../components/Label';
import LogoIcon from '../components/LogoIcon';

import styles from './style.module.scss';

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  /**
   * # 에러 발생시 InputBox 컴포넌트에 전달할 State
   *
   * emailError = true: 에러 발생, false: 에러 없음
   * emailErrorMessage = true: 에러가 발생시 생성되는 에러 메세지, false: 에러 메세지 없음
   *
   * passwordError = true: 에러 발생, false: 에러 없음
   * passwordErrorMessage = true: 에러가 발생시 생성되는 에러 메세지, false: 에러 메세지 없음
   */
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const router = useRouter();

  // 이메일 형식 검사를 위한 정규표현식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 이메일 유효성을 검사할 함수
  const validateEmail = (value: string) => emailRegex.test(value);
  // 비밀번호가 8자 이하 일때 검사할 함수
  const validatePassword = (value: string) => value.length >= 8;

  // 각 인풋의 값을 가져와 유효성 검사를 하는 함수
  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // 유효성 검사
    if (name === 'email') {
      // 이메일 형식이 아닐 경우 에러값은 true가 됩니다.
      setEmailError(!validateEmail(value));
      // 에러가 true 일때 에러 메세지 전달
      setEmailErrorMessage('이메일 형식으로 작성해 주세요.');
      if (value === '') {
        // 인풋의 값이 빈 값일때 에러를 생성해 메세지를 전달합니다
        setEmailError(true);
        setEmailErrorMessage('이메일을 입력해주세요.');
      }
    } else if (name === 'password') {
      // 비밀번호가 8자리 이하일때 에러값은 true가 됩니다.
      setPasswordError(!validatePassword(value));
      // 에러가 true 일때 에러 메세지 전달
      setPasswordErrorMessage('8자 이상 입력해주세요.');
      if (value === '') {
        // 인풋의 값이 빈 값일때 에러를 생성해 메세지를 전달합니다
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호를 입력해주세요.');
      }
    }
  };

  // 로그인을 위한 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const { email, password } = values;

    try {
      // 로그인 버튼 클릭시 POST 리퀘스트를 보냅니다.
      const response = await axiosInstance.post('/auth/sign-in', { email, password });
      // 응답 요청 성공시
      if (response.status === 200) {
        // 엑세스 토큰을 쿠키에 값을 저장합니다
        const { accessToken } = response.data;
        Cookies.set('accessToken', accessToken, { path: '/' });
        // 로그인 성공시 links 페이지로 이동합니다
        await router.push('/links');
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        // 이메일 중복을 메세지로 보여줍니다
        const errorMessage: string = error.response.data.message;
        setEmailError(true);
        setEmailErrorMessage(errorMessage);
      } else if (error.response && error.response.status === 401) {
        // 비밀번호가 틀릴시 메세지로 보여줍니다
        const errorMessage: string = error.response.data.message;
        setPasswordError(true);
        setPasswordErrorMessage(errorMessage);
      }
    }
  };

  // 구글 간편 로그인
  const handleGoogleSignIn = async () => {
    await signIn('google', { redirect: true, callbackUrl: '/' });
  };

  // const handleKakaoSignIn = () => {};

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
            <button className={styles.easyLoginButton} onClick={handleGoogleSignIn} aria-label="Google Sign In" type="button">
              <GoogleIcon />
            </button>
            <button className={styles.easyLoginButton} aria-label="Kakao Sign In" type="button">
              <KakaoIcon />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
