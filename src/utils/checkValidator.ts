import type { validatorProps } from '@/types';

import { regex } from '@/constants/regex';

export const checkValidator = (formData: Partial<validatorProps>): Partial<validatorProps> => {
  const { email, password } = formData;
  const err: Partial<validatorProps> = {};

  if (email !== undefined) {
    if (!email) {
      err.email = '이메일이 입력되지 않았습니다.';
    } else if (!regex.email.test(email)) {
      err.email = '입력된 이메일이 유효하지 않습니다.';
    }
  }

  if (password !== undefined) {
    if (!password) {
      err.password = '비밀번호가 입력되지 않았습니다.';
    } else if (password.length < 8) {
      err.password = '8자 이상의 패스워드를 사용해야 합니다.';
    } else if (!regex.password.test(password)) {
      err.password = '비밀번호는 문자, 숫자 및 특수문자를 포함해야 합니다.';
    }
  }

  return err;
};
