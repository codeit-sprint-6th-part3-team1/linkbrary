import * as React from 'react';

interface TwitterIconProps {
  width?: number;
  height?: number;
  rest?: React.SVGProps<SVGSVGElement>;
}

const TwitterIcon = ({ width = 20, height = 20, ...rest }: TwitterIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...rest}>
    <path
      fill="#fff"
      d="M19.703 4.114a7.773 7.773 0 0 1-2.23.61 3.891 3.891 0 0 0 1.707-2.148 7.75 7.75 0 0 1-2.465.942A3.883 3.883 0 0 0 10.1 7.059 11.024 11.024 0 0 1 2.1 3.003 3.883 3.883 0 0 0 3.3 8.186 3.872 3.872 0 0 1 1.541 7.7v.05a3.883 3.883 0 0 0 3.114 3.807 3.91 3.91 0 0 1-1.753.067 3.885 3.885 0 0 0 3.627 2.695A7.79 7.79 0 0 1 .78 15.927a10.98 10.98 0 0 0 5.95 1.744c7.142 0 11.046-5.915 11.046-11.045 0-.167-.004-.335-.012-.502a7.893 7.893 0 0 0 1.936-2.008l.002-.002Z"
    />
  </svg>
);
export default TwitterIcon;
