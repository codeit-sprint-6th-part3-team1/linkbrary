// // 이 친구는 왜 ok시 accessToken을 보내주는가 왜지 모르겠다

// import { useState } from 'react';
// import router from 'next/router';

// import { signUp } from '@/libs/authService';

// import useForm from '@/hooks/useForm';

// export default function Page() {
//   const [message, setMessage] = useState('');
//   const { formData, handleChange } = useForm({
//     email: '',
//     password: '',
//     name: '',
//   });

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const success = await signUp({ email: formData.email, password: formData.password, name: formData.name });
//       // TODO 삭제
//       if (success) {
//         setMessage('회원가입 성공');
//         router.push('/login');
//       } else {
//         setMessage('회원가입 실패');
//       }
//     } catch (error: any) {
//       setMessage(`'회원가입 실패', ${error}`);
//     }
//   };

//   return (
//     <div>
//       <h1>회원가입 페이지</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//       {message && <p>{message}</p>}
//       <button
//         onClick={() => {
//           router.push('/');
//         }}
//       >
//         홈페이지로
//       </button>
//       <div>
//         <button onClick={() => {}}>구글 간편회원가입</button>
//         <button onClick={() => {}}>카카오 간편회원가입</button>
//       </div>
//     </div>
//   );
// }
