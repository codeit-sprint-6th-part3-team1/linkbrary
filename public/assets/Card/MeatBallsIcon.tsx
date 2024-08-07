import * as React from 'react';
import { SVGProps } from 'react';

const MeatBallsIcon = (props: SVGProps<SVGSVGElement>) => (
  <>
    <svg style={{ backgroundColor: 'transparent' }} xmlns="http://www.w3.org/2000/svg" width={21} height={17} fill="none" {...props}>
      <circle cx={3.5} cy={8.5} r={1.5} fill="#333236" />
      <circle cx={10.5} cy={8.5} r={1.5} fill="#333236" />
      <circle cx={17.5} cy={8.5} r={1.5} fill="#333236" />
    </svg>
  </>
);
export default MeatBallsIcon;
