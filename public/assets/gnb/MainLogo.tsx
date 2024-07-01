import * as React from 'react';

interface MainLogoProps {
  width?: number;
  height?: number;
  rest?: React.SVGProps<SVGSVGElement>;
}

const MainLogo = ({ width = 133, height = 24, ...rest }: MainLogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    {...rest}
  >
    <path
      fill="#6D6AFE"
      transform={`scale(${width / 133}, ${height / 24})`}
      d="M5.206 16.205V1.292H0v19.48h14.964v-4.567H5.206ZM21.68 20.772V5.626h-5.206v15.146h5.206Zm0-16.31V.5h-5.206v3.961h5.206ZM33.171 5.16c-2.054 0-3.665.77-4.762 2.05V5.627h-5.206v15.146h5.206v-6.78c.047-2.913 1.33-4.148 3.432-4.148 1.797 0 2.498.908 2.498 3.075v7.853h5.205V12.01c0-4.59-1.727-6.85-6.373-6.85ZM46.04 10.59V.5h-5.205v20.272h5.206v-3.565l2.17-2.54 2.522 6.105h5.742l-3.291-8.039h-3.315l6.14-7.107h-5.673L46.04 10.59ZM67.085 21.238c3.151 0 7.027-1.794 7.027-8.039 0-6.245-3.876-8.039-7.027-8.039-1.75 0-3.315.513-4.576 1.375V.5h-5.206v20.272h5.206v-.909c1.261.886 2.825 1.375 4.576 1.375Zm-1.377-4.544c-1.798 0-3.199-.909-3.199-3.495v-.186c.07-2.424 1.448-3.31 3.199-3.31 2.007 0 3.198 1.05 3.198 3.496 0 2.47-1.19 3.495-3.198 3.495ZM74.935 20.772h5.206v-6.315c.047-2.936 1.377-4.637 6.023-4.637V5.16c-2.802 0-4.786.979-6.023 2.447v-1.98h-5.206v15.145ZM93.541 21.238c1.728 0 3.315-.49 4.576-1.375v.909h5.205V5.626h-5.206v.909c-1.26-.862-2.847-1.375-4.575-1.375-3.151 0-7.027 1.794-7.027 8.039 0 6.245 3.876 8.039 7.027 8.039Zm1.377-4.544c-2.007 0-3.198-1.025-3.198-3.495 0-2.447 1.19-3.495 3.198-3.495 1.798 0 3.198.932 3.198 3.495 0 2.586-1.4 3.495-3.198 3.495ZM104.613 20.772h5.206v-6.315c.046-2.936 1.377-4.637 6.022-4.637V5.16c-2.801 0-4.785.979-6.022 2.447v-1.98h-5.206v15.145ZM127.794 5.626v6.594c-.56.63-1.564.886-2.731.886-2.475 0-3.198-.77-3.198-2.19v-5.29h-5.206v5.662c0 4.148 2.941 6.385 7.027 6.385 1.517 0 2.918-.326 4.108-.886v.56c0 2.073-.794 2.819-2.848 2.819-1.704 0-2.521-.513-2.755-1.701h-5.229c.421 4.287 2.732 6.035 7.984 6.035 5.72 0 8.054-2.097 8.054-7.55V5.627h-5.206Z"
    />
  </svg>
);
export default MainLogo;