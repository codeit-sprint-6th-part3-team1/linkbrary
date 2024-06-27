import React, { useState } from 'react';
import styles from '@/components/component(example)/InputBox/style.module.scss';
import Logo from '@public/input.svg';
import Image from 'next/image';

interface Input {
  id: string;
}

const InputBox: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState<string>('default');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setStatus('writing');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setStatus('writing');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitted');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputcontainer}>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="내용 입력"
          required
          className={styles.inputemail}
        />

        <Image 
          src={Logo}
          width={20}
          height={20}
          alt="password logo"
          className={styles.logo}
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className={styles.inputpw}
        />
        {status === 'submitted' && <p className={styles.message}>내용 작성했음</p>}
        {status === 'submitted' && <p className={styles.error}>내용을 다시 작성해주세요</p>}
      </div>
    </form>
  );
};

export default InputBox;
