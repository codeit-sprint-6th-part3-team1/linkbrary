import * as React from 'react';
import { SVGProps } from 'react';
import styles from '../../../src/components/Card/style.module.scss';

const CardImageNull = (props: SVGProps<SVGSVGElement>) => (
  <svg className={styles.cardImageNull} xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path fill="#DDDFFF" d="M0 0h340v200H0z" />
    <g fill="#6D6AFE" opacity={0.2}>
      <path d="M108.206 103.705V88.792H103v19.48h14.964v-4.567h-9.758ZM124.68 108.272V93.126h-5.206v15.146h5.206Zm0-16.31V88h-5.206v3.961h5.206ZM136.171 92.66c-2.054 0-3.665.77-4.762 2.05v-1.584h-5.206v15.146h5.206v-6.781c.047-2.912 1.331-4.147 3.432-4.147 1.797 0 2.498.908 2.498 3.075v7.853h5.205v-8.761c0-4.59-1.727-6.85-6.373-6.85ZM149.041 98.09V88h-5.206v20.272h5.206v-3.565l2.171-2.54 2.521 6.105h5.743l-3.292-8.039h-3.315l6.14-7.107h-5.673l-4.295 4.963ZM170.085 108.738c3.151 0 7.027-1.794 7.027-8.039 0-6.245-3.876-8.039-7.027-8.039-1.751 0-3.315.513-4.576 1.375V88h-5.205v20.272h5.205v-.909c1.261.886 2.825 1.375 4.576 1.375Zm-1.377-4.544c-1.798 0-3.199-.909-3.199-3.495v-.186c.07-2.424 1.448-3.31 3.199-3.31 2.007 0 3.198 1.05 3.198 3.496 0 2.47-1.191 3.495-3.198 3.495ZM177.935 108.272h5.206v-6.315c.047-2.936 1.377-4.637 6.023-4.637v-4.66c-2.802 0-4.786.979-6.023 2.447v-1.98h-5.206v15.145ZM196.541 108.738c1.728 0 3.315-.489 4.576-1.375v.909h5.205V93.126h-5.205v.909c-1.261-.862-2.848-1.375-4.576-1.375-3.152 0-7.027 1.794-7.027 8.039 0 6.245 3.875 8.039 7.027 8.039Zm1.377-4.544c-2.007 0-3.198-1.025-3.198-3.495 0-2.447 1.191-3.495 3.198-3.495 1.798 0 3.199.932 3.199 3.495 0 2.586-1.401 3.495-3.199 3.495ZM207.613 108.272h5.206v-6.315c.046-2.936 1.377-4.637 6.022-4.637v-4.66c-2.801 0-4.785.979-6.022 2.447v-1.98h-5.206v15.145ZM230.794 93.126v6.594c-.56.63-1.564.886-2.731.886-2.475 0-3.198-.77-3.198-2.19v-5.29h-5.206v5.662c0 4.148 2.941 6.385 7.027 6.385 1.517 0 2.918-.326 4.108-.886v.56c0 2.073-.794 2.819-2.848 2.819-1.704 0-2.521-.513-2.755-1.701h-5.229c.421 4.287 2.732 6.035 7.984 6.035 5.72 0 8.054-2.097 8.054-7.55V93.126h-5.206Z" />
    </g>
  </svg>
);
export default CardImageNull;
