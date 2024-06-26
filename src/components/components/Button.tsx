import React from 'react';
import styles from './Button.module.scss';

type ButtonStyleProps = {
  variant: 'add-link-large' | 'add-link-small' | 'add-folder' | 'share' | 'all-large' | 'all-small';
  colorType: 'primary' | 'white' | 'gray-200' | 'primary-gradient';
};

interface ButtonProps extends ButtonStyleProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant, colorType }) => {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${styles[colorType]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
