import * as React from 'react';

interface MMainLogoProps {
  width?: number;
  height?: number;
  props?: React.SVGProps<SVGSVGElement>;
}

const MMainLogo = ({ width = 20, height = 20, props }: MMainLogoProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={89} height={16} fill="none" {...props}>
    <path
      fill="#6D6AFE"
      d="M3.47 10.47V.528H0v12.987h9.976V10.47H3.47ZM14.453 13.515V3.417h-3.47v10.098h3.47Zm0-10.874V0h-3.47v2.64h3.47ZM22.114 3.107c-1.37 0-2.443.512-3.175 1.367V3.417h-3.47v10.098h3.47v-4.52c.032-1.943.887-2.766 2.288-2.766 1.198 0 1.665.606 1.665 2.05v5.236h3.47V7.674c0-3.06-1.15-4.567-4.248-4.567ZM30.694 6.726V0h-3.47v13.515h3.47v-2.377l1.447-1.693 1.68 4.07h3.83l-2.195-5.36h-2.21l4.093-4.738h-3.782l-2.863 3.31ZM44.723 13.825c2.101 0 4.685-1.196 4.685-5.359s-2.584-5.36-4.685-5.36c-1.167 0-2.21.343-3.05.917V0h-3.47v13.515h3.47v-.606c.84.59 1.883.916 3.05.916Zm-.918-3.029c-1.198 0-2.132-.606-2.132-2.33v-.124c.047-1.616.965-2.206 2.132-2.206 1.339 0 2.132.699 2.132 2.33 0 1.647-.793 2.33-2.132 2.33ZM49.957 13.515h3.47v-4.21c.031-1.957.919-3.091 4.016-3.091V3.107c-1.868 0-3.19.652-4.016 1.63v-1.32h-3.47v10.098ZM62.36 13.825c1.152 0 2.21-.326 3.051-.916v.606h3.47V3.417h-3.47v.606a5.399 5.399 0 0 0-3.05-.916c-2.101 0-4.685 1.196-4.685 5.359s2.584 5.36 4.685 5.36Zm.919-3.029c-1.339 0-2.132-.683-2.132-2.33 0-1.631.794-2.33 2.132-2.33 1.198 0 2.132.621 2.132 2.33 0 1.724-.934 2.33-2.132 2.33ZM69.742 13.515h3.47v-4.21c.031-1.957.919-3.091 4.016-3.091V3.107c-1.868 0-3.19.652-4.016 1.63v-1.32h-3.47v10.098ZM85.196 3.417v4.397c-.373.419-1.043.59-1.82.59-1.65 0-2.133-.513-2.133-1.46V3.417h-3.47v3.775c0 2.765 1.96 4.256 4.684 4.256a6.447 6.447 0 0 0 2.74-.59v.373c0 1.383-.53 1.88-1.9 1.88-1.136 0-1.68-.342-1.836-1.134h-3.486c.28 2.858 1.82 4.023 5.322 4.023 3.813 0 5.37-1.398 5.37-5.033v-7.55h-3.47Z"
    />
  </svg>
);
export default MMainLogo;
