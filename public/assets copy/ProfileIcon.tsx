import * as React from 'react';

interface MainIconProps {
  width?: number;
  height?: number;
  props?: React.SVGProps<SVGSVGElement>;
}

const MainIcon = ({ width = 20, height = 20, props }: MainIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} fill="none" {...props}>
    <circle cx={14} cy={14} r={14} fill="#6D6AFE" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M14 8.7a2.017 2.017 0 1 0 0 4.035A2.017 2.017 0 0 0 14 8.7Zm-4.166 9.488c0 .224.18.405.405.405h7.523a.405.405 0 0 0 .405-.405 4.167 4.167 0 1 0-8.334 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default MainIcon;
