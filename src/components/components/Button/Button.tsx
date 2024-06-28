import React from 'react';
import styles from './Button.module.scss';

type ButtonStyleProps = {
  /**
   * 버튼의 스타일 변형을 지정합니다.
   * - 'add-link-large': 링크 추가 큰 버튼
   * - 'add-link-small': 링크 추가 작은 버튼
   * - 'add-folder': 폴더 추가 버튼
   * - 'share': 공유 버튼
   * - 'all-large': 전체 큰 버튼
   * - 'all-small': 전체 작은 버튼
   */
  variant: 'add-link-large' | 'add-link-small' | 'add-folder' | 'share' | 'all-large' | 'all-small';
  /**
   * 버튼의 색상 유형을 지정합니다.
   * - 'primary': 기본 색상
   * - 'white': 흰색
   * - 'gray-200': 회색 (200 레벨)
   * - 'primary-gradient': 기본 색상 그라데이션
   */
  colorType: 'primary' | 'white' | 'gray-200' | 'primary-gradient';
};

interface ButtonProps extends ButtonStyleProps {
  children?: React.ReactNode;
  onClick?: () => void;
  text?: string;
}

/**
 * Button 컴포넌트는 다양한 스타일과 색상 변형을 지원합니다.
 *
 * @component
 * @example
 * // 기본 사용법
 * <Button variant="add-link-large" colorType="primary" onClick={() => console.log('Button clicked')} text="Add Link" />
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {'add-link-large' | 'add-link-small' | 'add-folder' | 'share' | 'all-large' | 'all-small'} props.variant - 버튼의 스타일 변형
 * @param {'primary' | 'white' | 'gray-200' | 'primary-gradient'} props.colorType - 버튼의 색상 유형
 * @param {React.ReactNode} [props.children] - 버튼 안에 렌더링할 자식 요소들
 * @param {() => void} [props.onClick] - 버튼 클릭 시 호출되는 함수
 * @param {string} [props.text] - 버튼에 표시할 텍스트
 * @return {JSX.Element} 렌더링된 버튼 컴포넌트
 */

const Button: React.FC<ButtonProps> = ({ children, onClick, variant, colorType, text }) => {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${styles[colorType]}`} onClick={onClick}>
      {variant === 'add-link-large' || variant === 'add-link-small' ? text : children}
    </button>
  );
};

export default Button;
