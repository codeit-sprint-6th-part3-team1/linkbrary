import * as React from 'react';
import { SVGProps } from 'react';
import styles from '../style.module.scss';

const CardStarFalse = (props: SVGProps<SVGSVGElement>) => (
  <svg className={styles.cardStar} xmlns="http://www.w3.org/2000/svg" width={30} height={31} fill="none" {...props}>
    <path
      fill="#000"
      fillOpacity={0.2}
      stroke="#fff"
      d="M14.91 1.376a.1.1 0 0 1 .18 0l4.024 8.616a1.1 1.1 0 0 0 .83.621l9.048 1.39a.1.1 0 0 1 .056.169L22.46 18.96a1.1 1.1 0 0 0-.297.942l1.55 9.55a.1.1 0 0 1-.148.103l-8.03-4.463a1.1 1.1 0 0 0-1.07 0l-8.03 4.463a.1.1 0 0 1-.148-.104l1.55-9.549a1.1 1.1 0 0 0-.297-.942L.952 12.172a.1.1 0 0 1 .056-.169l9.049-1.39a1.1 1.1 0 0 0 .83-.621l4.022-8.616Z"
    />
  </svg>
);
export default CardStarFalse;
