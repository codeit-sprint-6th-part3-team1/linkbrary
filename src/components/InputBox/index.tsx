import { useState } from 'react';
import Image from 'next/image';

import { InputTypes } from '@/constants/inputTypes';

import hideIcon from '../../../public/assets/input/eye-off.svg';
import showIcon from '../../../public/assets/input/eye-on.svg';

import styles from './style.module.scss';

interface InputBoxProps {
  err?: boolean;
  errMsg?: string;
  type?: InputTypes;
  onValueChange?: (value: string) => void;
}

function InputBox({ err, errMsg = '내용을 다시 작성해주세요', type = InputTypes.PASSWORD, onValueChange }: InputBoxProps) {
  const [value, setValue] = useState<string>('');
  const [pw, setPw] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setValue(text);
    if (onValueChange) {
      onValueChange(text);
    }
  };

  switch (type) {
    case 'email':
      return (
        <>
          <div className={styles.inputContainer} data-color={err ? 'red' : 'blue'}>
            <input className={styles.input} type="email" value={value} placeholder="내용 입력" onChange={(e) => handleChange(e)} />
          </div>
          <p className={styles.errMsg} style={{ display: err ? 'block' : 'none' }}>
            {errMsg}
          </p>
        </>
      );
    case 'password':
      return (
        <>
          <div className={styles.inputContainer} data-color={err ? 'red' : 'blue'}>
            <input className={styles.input} type={pw ? 'password' : 'text'} value={value} placeholder="내용 입력" onChange={(e) => handleChange(e)} />
            <Image src={pw ? hideIcon : showIcon} width={20} height={20} onClick={() => setPw(!pw)} alt="Toggle visibility" className={styles.icon} />
          </div>
          <p className={styles.errMsg} style={{ display: err ? 'block' : 'none' }}>
            {errMsg}
          </p>
        </>
      );
    default:
      return (
        <>
          <div className={styles.inputContainer} data-color={err ? 'red' : 'blue'}>
            <input className={styles.input} type="text" value={value} placeholder="내용 입력" onChange={(e) => handleChange(e)} />
          </div>
          <p className={styles.errMsg} style={{ display: err ? 'block' : 'none' }}>
            {errMsg}
          </p>
        </>
      );
  }
}

export default InputBox;
