import React from 'react';
import styles from './Button.module.scss';

type ButtonStyleProps = {
  variant: 'add-link-large' | 'add-link-small' | 'add-folder' | 'share' | 'all-large' | 'all-small';
  colorType: 'primary' | 'white' | 'gray-200' | 'primary-gradient';
};

interface ButtonProps extends ButtonStyleProps {
  children?: React.ReactNode;
  onClick?: () => void;
  text?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant, colorType, text }) => {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${styles[colorType]}`} onClick={onClick}>
      {variant === 'add-link-large' || variant === 'add-link-small' ? text : children}
    </button>
  );
};

export default Button;
