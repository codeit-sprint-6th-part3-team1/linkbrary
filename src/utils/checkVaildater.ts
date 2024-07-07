interface validatorProps {
  email: string;
  password: string;
}

const regex = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
  password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
};

const checkValidator = ({ email, password }: Partial<validatorProps>): Partial<validatorProps> => {
  const err: Partial<validatorProps> = {};

  if (!email) {
    err.email = '이메일이 입력되지 않았습니다.';
  } else if (!regex.email.test(email)) {
    err.email = '입력된 이메일이 유효하지 않습니다.';
  }

  if (!password) {
    err.password = '비밀번호가 입력되지 않았습니다.';
  } else if (password.length < 8) {
    err.password = '8자 이상의 패스워드를 사용해야 합니다.';
  }

  return err;
};
