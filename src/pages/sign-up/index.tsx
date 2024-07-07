import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axiosInstance from '@/libs/axios';

import { InputTypes } from '@/constants/inputTypes';

import InputBox from '@/components/InputBox';

import Label from '../components/Label';
import LogoIcon from '../components/LogoIcon';

import styles from './style.module.scss';

export default function Page() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    passwordRepeat: '',
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

  const [passwordRepeatError, setPasswordRepeatError] = useState(false);
  const [passwordRepeatErrorMessage, setPasswordRepeatErrorMessage] = useState('');

  // 버튼의 disabled 값을 제어 합니다
  const [isDisabled, setIsDisabled] = useState(true);
  // 버튼의 disabled true || false 여부에 따라 버튼의 색상

  const disabledTrue = { background: 'linear-gradient(90.99deg, #3E3E43 0.12%, #9FA6B2 101.84%)', color: '#9FA6B2' };
  const disabledFalse = { background: 'linear-gradient(90.99deg, #6d6afe 0.12%, #6ae3fe 101.84%)', color: '#f5f5f5' };
  // { background: 'gray', color: '#9FA6B2' };
  const router = useRouter();
  // 이메일 형식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // 이메일 유효성을 검사할 함수
  const validateEmail = (value: string) => emailRegex.test(value);
  // 비밀번호가 8자 이하 일때 검사할 함수
  const validatePassword = (value: string) => value.length >= 8;

  /**
   * 각 인풋의 모든 값이 채워지고, 유효성 검사에 통과할시 회원가입 버튼 활성화
   */
  useEffect(() => {
    const allFieldsFilled = values.email !== '' && values.password !== '' && values.passwordRepeat !== '';
    const noErrors = !emailError && !passwordError && !passwordRepeatError;
    setIsDisabled(!(allFieldsFilled && noErrors));
  }, [values, emailError, passwordError, passwordRepeatError]);

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
        setEmailErrorMessage('이메일을 입력해 주세요.');
      }
    } else if (name === 'password') {
      setPasswordError(!validatePassword(value));
      setPasswordErrorMessage('8자 이상 입력해주세요.');
      if (value === '') {
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호를 입력해 주세요.');
      }
    } else if (name === 'passwordRepeat') {
      setPasswordRepeatError(value !== values.password);
      setPasswordRepeatErrorMessage('비밀번호가 일치하지 않습니다.');
      if (value === '') {
        setPasswordRepeatError(true);
        setPasswordRepeatErrorMessage('비밀번호가 일치하지 않습니다.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { email, password } = values;

      const response = await axiosInstance.post('/auth/sign-up', { email, password, name: email });

      if (response.status === 200) {
        const { accessToken } = response.data;
        Cookies.set('accessToken', accessToken, { path: '/' });
        alert('가입이 완료되었습니다');
        await router.push('/login');
      }

      setValues({ email: '', password: '', passwordRepeat: '' });
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        const errorMessage: string = error.response.data.message;
        setEmailError(true);
        setEmailErrorMessage(errorMessage);
      }
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.signupContainer}>
        <div className={styles.formHeaderContainer}>
          <div className={styles.formHeaderWrap}>
            <Link className={styles.formLogo} href="/">
              <LogoIcon />
            </Link>
            <div className={styles.formTitleContainer}>
              <p className={styles.formTitle}>이미 회원이신가요?</p>
              <div className={styles.titleLinkWrap}>
                <Link className={styles.titleLink} href="/login">
                  로그인 하기
                </Link>
              </div>
            </div>
          </div>
        </div>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
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
            <div className={styles.inputWrap}>
              <Label className={styles.inputLabel} htmlFor="passwordRepeat">
                비밀번호 확인
              </Label>
              <InputBox
                type={InputTypes.PASSWORD}
                value={values.passwordRepeat}
                err={passwordRepeatError}
                errMsg={passwordRepeatErrorMessage}
                onValueChange={(value) => handleChange('passwordRepeat', value)}
              />
            </div>
          </div>
          <button type="button" disabled={isDisabled} className={styles.formButton} style={isDisabled ? disabledTrue : disabledFalse}>
            회원가입
          </button>
        </form>
      </main>
    </div>
  );
}
