import axiosInstance from './axios';

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface SignupResponse {
  accessToken: string;
}

export const signupApi = async (data: SignupData): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>('/auth/sign-up', data);
  return response.data;
};

export interface ApiError {
  message: string;
}

export const isApiError = (error: any): error is ApiError => {
  return error.response && error.response.data && error.response.data.message;
};
