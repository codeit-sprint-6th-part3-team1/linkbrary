import { useState } from 'react';
import Image from 'next/image';

import pwOnIcon from '../../../public/assets/input/eye-off.svg';
import pwOffIcon from '../../../public/assets/input/eye-on.svg';

import styles from './style.module.scss';

interface InputBoxProps {
  type: string;
  value: string;
  err: boolean;
  errMsg: string;
  onValueChange: (value: string) => void;
}

const InputBox = ({ type, value, err, errMsg, onValueChange }: InputBoxProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.input} data-color={err && value.length ? 'red' : 'default'}>
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          aria-invalid={err}
          aria-describedby={err ? `${type}-error` : undefined}
        />
        {type === 'password' && value.length > 0 && (
          <button type="button" className={styles.pwIconBtn} onClick={handlePasswordToggle}>
            <Image src={showPassword ? pwOffIcon : pwOnIcon} alt="toggle password visibility" width={17} height={17} />
          </button>
        )}
      </div>
      {err && value.length > 0 && <span className={styles.errMsg}>{errMsg}</span>}
    </div>
  );
};

export default InputBox;
