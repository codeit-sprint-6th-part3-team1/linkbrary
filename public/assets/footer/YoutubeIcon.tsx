import * as React from 'react';

interface YoutubeIconProps {
  width?: number;
  height?: number;
  rest?: React.SVGProps<SVGSVGElement>;
}

const YoutubeIcon = ({ width = 20, height = 20, ...rest }: YoutubeIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...rest}>
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M19.583 5.422a2.322 2.322 0 0 0-.638-1.058 2.541 2.541 0 0 0-1.116-.618c-1.564-.413-7.834-.413-7.834-.413a63.854 63.854 0 0 0-7.825.392 2.633 2.633 0 0 0-1.115.633 2.414 2.414 0 0 0-.649 1.064A24.242 24.242 0 0 0 0 10c-.01 1.534.125 3.067.406 4.578.114.4.337.764.646 1.058.31.294.694.506 1.118.619 1.585.412 7.825.412 7.825.412 2.617.03 5.233-.102 7.835-.392.418-.108.801-.32 1.115-.618.304-.289.524-.655.637-1.059.288-1.509.427-3.043.418-4.579a22.148 22.148 0 0 0-.417-4.597ZM8 12.853V7.147l5.217 2.854L8 12.853Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default YoutubeIcon;
