import React from 'react';

interface LabelProps {
<<<<<<< HEAD
  children: React.ReactNode;
  className: string;
  htmlFor: string;
}

const Label = ({ children, className, htmlFor }: LabelProps) => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {children}
    </label>
  );
=======
  children: string;
  className: string;
}

const Label = ({ children, className }: LabelProps) => {
  return <label className={className}>{children}</label>;
>>>>>>> a246fcbaf6d9013f2ef70341543812f83b4e5a56
};

export default Label;
