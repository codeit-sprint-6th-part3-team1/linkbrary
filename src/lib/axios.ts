import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://linkbrary-api.vercel.app/6-1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
