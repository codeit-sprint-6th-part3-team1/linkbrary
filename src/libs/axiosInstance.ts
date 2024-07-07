import axios from 'axios';

import { getCookie } from '@/utils/cookie';

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_ROOT_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    console.log('token', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;

// 토큰 만료 시 로그아웃 처리 및 로그인 페이지로 이동
// 개발자 환경에서는 토큰 만료 시 로그인 페이지로 이동하지 않고 자동으로 토큰 갱신
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalRequest = err.config;
//     if (err.response.status === 401) {
//       if (process.env.NEXT_PUBLIC_ENV === 'dev') {
//         try {
//           const userInfo = useRecoilState(userState);
//           //TODO 토큰 갱신 로직 추가
//           //기존 유저의 정보를 상태로 저장 -> 토큰 만료시 해당 상태로 토큰 갱신
//           const newAccessToken = 'newAccessToken';
//           setCookie('accessToken', newAccessToken, { path: '/', secure: false }); //ASK secure: true로 변경해야 할까요?

//           // 토큰 갱신 후 오류로 안 보내졌던 요청을 다시 보냄!
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axios(originalRequest);
//         } catch (err) {
//           removeCookie('accessToken');
//           window.location.href = '/';
//           return Promise.reject(err);
//         }
//       }
//       removeCookie('accessToken');
//       window.location.href = '/';
//     }
//     return Promise.reject(err);
//   },
// );
