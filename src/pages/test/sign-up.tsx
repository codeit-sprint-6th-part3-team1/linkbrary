import React, { useState } from 'react';

// 이 친구는 왜 ok시 accessToken을 보내주는가 왜지 모르겠다

export default function page() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch('https://linkbrary-api.vercel.app/6-1/auth/sign-up', {
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
      setMessage(`User created successfully: ${accessToken}`);
    } else {
      const error = await response.json();
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        setMessage('Error: This email is already registered.');
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
