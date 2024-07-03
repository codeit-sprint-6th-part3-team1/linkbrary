import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { loginState } from '@/recoil/state';

const Page: React.FC = () => {
  const setLogin = useSetRecoilState(loginState);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('https://linkbrary-api.vercel.app/6-1/auth/sign-in', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.accessToken;
      setLogin(accessToken);
      Cookies.set('accessToken', accessToken);
      setMessage('Signed in successfully');
      router.push('/links');
    } else {
      const error = await response.json();
      setMessage(`Error: ${error.message}`);
    }
  };
  const handleSignUp = () => {
    router.push('/sign-up');
  };
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
      <div>
        <button onClick={handleSignUp}>회원가입</button>
      </div>
    </div>
  );
};

export default Page;
