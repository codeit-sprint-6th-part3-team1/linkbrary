import styles from './style.module.scss';
import Link from 'next/link';
import LogoIcon from '../components/LogoIcon';
import Label from '../components/Label';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axiosInstance, { setAuthToken } from '@/lib/axios';

export default function signup() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { email, password } = values;

      const response = await axiosInstance.post('/auth/sign-up', { email, password, name: email });
      const accessToken = response.data.accessToken;

      if (response.status === 400) {
        alert('중복된 이메일 입니다');
        return;
      }

      if (accessToken) {
        sessionStorage.setItem('accessToken', accessToken);
        setAuthToken(accessToken);
        alert('가입이 완료되었습니다');
        router.push('/login');
      } else {
        alert('No access token found in the response');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.signupContainer}>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
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
          <div className={styles.inputContainer}>
            <div className={styles.inputWrap}>
              <Label className={styles.inputLabel} htmlFor="email">
                이메일
              </Label>
              <div className={styles.inputBackground}>
                {/* 인풋 컴포넌트  */}
                <input id="email" name="email" type="email" value={values.email} autoComplete="username" placeholder="내용 입력" onChange={handleChange} />
              </div>
            </div>
            <div className={styles.inputWrap}>
              <Label className={styles.inputLabel} htmlFor="password">
                비밀번호
              </Label>
              <div className={styles.inputBackground}>
                {/* 인풋 컴포넌트  */}
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={values.password}
                  placeholder="내용 입력"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.inputWrap}>
              <Label className={styles.inputLabel} htmlFor="passwordRepeat">
                비밀번호 확인
              </Label>
              <div className={styles.inputBackground}>
                {/* 인풋 컴포넌트  */}
                <input
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type="password"
                  autoComplete="new-password"
                  value={values.passwordRepeat}
                  placeholder="내용 입력"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button className={styles.formButton}>회원가입</button>
        </form>
      </main>
    </div>
  );
}
