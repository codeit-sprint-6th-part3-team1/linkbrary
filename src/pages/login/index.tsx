import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useForm from '@/hooks/useForm';
import useLogin from '@/hooks/useLogin';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const { isLoggedIn, login } = useLogin();

  const onSubmit = async (formData: LoginFormValues) => {
    try {
      const success = await login(formData);
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

  const { formData, handleChange, handleSubmit, resetForm, errors, isLoading } = useForm<LoginFormValues>({
    inputValue: { email: '', password: '' },
    onSubmit,
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/links/1');
    }
  }, [isLoggedIn, router]);

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
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          Sign In
        </button>
      </form>
      {message && <p>{message}</p>}
      <div>
        <p>아직 회원이 아니신가요?</p>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
}
