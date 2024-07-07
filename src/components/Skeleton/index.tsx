import React from 'react';

import s from './style.module.scss';

type SkeletonProps = {
  count?: number;
  width?: string;
  height?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ count = 1, width = 20, height = 10 }) => (
  <>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <div key={index} className={s.skeleton} style={{ width: width || 'auto', height: height || '20px' }} />
      ))}
  </>
);

export default Skeleton;
