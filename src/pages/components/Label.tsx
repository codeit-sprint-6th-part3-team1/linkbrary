import React from 'react';

interface LabelProps {
  children: string;
  className: string;
}

const Label = ({ children, className }: LabelProps) => {
  return <label className={className}>{children}</label>;
};

export default Label;
