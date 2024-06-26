import React, { useState } from 'react';
import styles from '@/components/component(example)/InputBox/style.module.scss';


interface Input {
    email: string;
    password: string;
}
const InputBox: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className={styles.inputcontainer}>
        <form className={styles.container} onSubmit={handleSubmit}>
            <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="내용 입력"
            className={styles.input}
            />

            <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className={styles.input}
            />
        </form>
    </div>
  );
};

export default InputBox;
