import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useForm from '@/hooks/useForm';
import useLogin from '@/hooks/useLogin';

export default function Page() {
  const router = useRouter();
  const [message, setMessage] = useState(''); // TODO 삭제
  const { isLoggedIn, login } = useLogin();
  const { formData, handleChange, resetForm } = useForm({ email: '', password: '' });

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/links/1');
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const success = await login({ email: formData.email, password: formData.password });
      if (success) {
        resetForm();
        router.push('/links/1');
      } else {
        setMessage('Login failed');
      }
    } catch (error: any) {
      setMessage(`'로그인 실패', ${error}`);
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
        <p>아직 회원이 아니신가요?</p>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
}
