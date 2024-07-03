import { useState } from 'react';
import styles from './style.module.scss';
import showIcon from '@public/input-show.svg';
import hideIcon from '@public/input-hide.svg';
import { InputTypes } from '@/constants/inputTypes';
import Image from 'next/image';

interface InputBoxProps {
  err?: boolean;
  errMsg?: string;
  type?: InputTypes;
}

const InputBox = ({ err, errMsg = '내용을 다시 작성해주세요', type = InputTypes.PASSWORD }: InputBoxProps) => {
  //input, value, text
  //get, add, update
  const [value, setValue] = useState<string>('');
  const [pw, setPw] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setValue(text);
  };

  switch (type) {
    case 'email':
      return (
        <>
          <div className={styles.inputContainer} data-color={err ? 'red' : 'blue'}>
            <input
              className={styles.input}
              type="text"
              value={value}
              placeholder={'내용 입력'}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
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
            <input
              className={styles.input}
              type={pw ? 'password' : 'text'}
              value={value}
              placeholder={'내용 입력'}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
        
            < Image src={pw ? hideIcon : showIcon} 
              onClick={() => {
                setPw(!pw);
              }}
               alt="Toggle visibility" 
            />
          
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
            <input
              className={styles.input}
              type="email"
              value={value}
              placeholder={'내용 입력'}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
          </div>
          <p className={styles.errMsg} style={{ display: err ? 'block' : 'none' }}>
            {errMsg}
          </p>
        </>
      );
  }
};

export default InputBox;
