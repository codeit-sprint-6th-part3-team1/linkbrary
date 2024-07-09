export type Provider = 'google' | 'kakao';

export interface AuthProps {
  name?: string;
  email: string;
  password: string;
  provider?: Provider;
}

export interface validatorProps {
  email?: string;
  password?: string;
}
