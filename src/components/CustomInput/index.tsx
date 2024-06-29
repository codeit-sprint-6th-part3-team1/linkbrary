import React, { useState } from 'react';
import s from './style.module.scss';
import Logo from '@public/input.svg';
import Image from 'next/image';
import { InputTypes } from '@/constants/inputTypes';

interface CustomInputProps {
  type?: InputTypes;
  value: string;
  label: string;
  onchange: (value: string) => void;
}

export default function CustomInput({ type = InputTypes.EMAIL, value, label, onchange }: CustomInputProps) {
  const renderInput = () => {
    const [showPw, setShowPw] = useState(false);

    switch (type) {
      case InputTypes.TEXT:
        return <input type="text" value={value} onChange={(e) => onchange(e.target.value)} className={s.input} />;
      case InputTypes.EMAIL:
        return <input type="email" value={value} onChange={(e) => onchange(e.target.value)} className={s.input} />;
      case InputTypes.PASSWORD:
        return (
          <div className={s.pwInputWrapper}>
            <input type={showPw ? 'text' : 'password'} value={value} onChange={(e) => onchange(e.target.value)} className={s.input} />
            <button
              className={s.showPwBtn}
              onClick={() => {
                setShowPw((prevState) => !prevState);
              }}
            >
              Show
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={s.customInput}>
      <label>{label}</label>
      {renderInput()}
    </div>
  );
}
