import { useCallback, useEffect, useState } from 'react';
import type { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { loginState } from '@/recoil';
import { useMutation } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import type { AuthProps } from '@/types';

import { login } from '@/libs/authService';

import { InputTypes } from '@/constants/inputTypes';

import { setCookie } from '@/utils/cookie';

import InputBox from '@/components/InputBox';
import SignLayout from '@/components/layout/SignLayout';

import GoogleIcon from '../components/GoogleIcon';
import KakaoIcon from '../components/KakaoIcon';
import LogoIcon from '../components/LogoIcon';

import styles from './style.module.scss';

export default function Login() {
  const [, setLoginState] = useRecoilState(loginState);
  interface FormValues {
    email: string;
    password: string;
  }

  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = useCallback((value: string) => emailRegex.test(value), []);
  const validatePassword = (value: string) => value.length >= 8;

  useEffect(() => {
    const isEmailValid = validateEmail(values.email);
    const isPasswordValid = validatePassword(values.password);
    const areBothEmpty = values.email === '' && values.password === '';

    setIsFormValid((isEmailValid && isPasswordValid) || areBothEmpty);
  }, [values, validateEmail]);

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === 'email') {
      if (value === '') {
        setEmailError(false);
        setEmailErrorMessage('');
      } else {
        const isValid = validateEmail(value);
        setEmailError(!isValid);
        setEmailErrorMessage(isValid ? '' : '이메일 형식으로 작성해 주세요.');
      }
      // TODO : 살려야 함
      // } else if (name === 'password') {
      //   if (value === '') {
      //     setPasswordError(false);
      //     setPasswordErrorMessage('');
      //   } else {
      //     const isValid = validatePassword(value);
      //     setPasswordError(!isValid);
      //     setPasswordErrorMessage(isValid ? '' : '8자 이상 입력해주세요.');
      //   }
    }
  };

  const signInSubmit = useMutation({
    mutationFn: ({ email, password }: AuthProps) => login({ email, password }),
    onSuccess: (response) => {
      const accessToken = response?.accessToken;
      if (accessToken) {
        setCookie('accessToken', accessToken, {
          path: '/',
          secure: true,
        });
        setLoginState(true);
        void router.push('/links/all');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response && error.response.status === 400) {
        const errorMessage: string = error.response.data.message;
        setEmailError(true);
        setEmailErrorMessage(errorMessage);
      } else if (error.response && error.response.status === 401) {
        const errorMessage: string = error.response.data.message;
        setPasswordError(true);
        setPasswordErrorMessage(errorMessage);
      }
    },
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit = async () => {
    const { email, password } = values;
    signInSubmit.mutate({ email, password });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await onSubmit();
  };
  const handleGoogleSignIn = async () => {
    await signIn('google', { redirect: true, callbackUrl: '/' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void handleSubmit(e);
    }
  };

  return (
    <SignLayout>
      <div className={styles.formHeaderContainer}>
        <Link href="/">
          <LogoIcon />
        </Link>
        <div className={styles.formTitleContainer}>
          <p>회원이 아니신가요?</p>
          <Link href="/signup">회원 가입하기</Link>
        </div>
      </div>

      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <label htmlFor="email">이메일</label>
          <InputBox
            type={InputTypes.EMAIL}
            value={values.email}
            err={emailError}
            errMsg={emailErrorMessage}
            onValueChange={(value) => handleChange('email', value)}
          />
          <label htmlFor="password">비밀번호</label>
          <InputBox
            type={InputTypes.PASSWORD}
            value={values.password}
            err={passwordError}
            errMsg={passwordErrorMessage}
            onValueChange={(value) => handleChange('password', value)}
          />
          <button type="submit" className={styles.formButton} disabled={!isFormValid} data-err={emailError || passwordError ? 'true' : 'false'}>
            로그인
          </button>
        </form>
      </div>

      <div className={styles.easyLoginContainer}>
        <p>소셜 로그인</p>
        <div className={styles.easyLoginButtonWrap}>
          <button onClick={handleGoogleSignIn} aria-label="Google Sign In" type="button">
            <GoogleIcon />
          </button>
          <button aria-label="Kakao Sign In" type="button">
            <KakaoIcon />
          </button>
        </div>
      </div>
    </SignLayout>
  );
}
