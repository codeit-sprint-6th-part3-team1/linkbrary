import { useState } from 'react';

interface formDataProps {
  [key: string]: string;
}

interface UseFormResult {
  formData: formDataProps;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
}

const useForm = (initialValues: formDataProps = {}): UseFormResult => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData(initialValues);
  };

  return { formData, handleChange, resetForm };
};

export default useForm;

// import { useState } from 'react';

// interface formDataProps {
//   [key: string]: string;
// }

// interface UseFormResult {
//   formData: formDataProps;
//   handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   handleSubmit: (event: React.SyntheticEvent) => void;
//   resetForm: () => void;
//   err: Partial<validatorProps>;
//   isLoading: boolean;
// }

// const useForm = (initialValues: formDataProps = {}): UseFormResult => {
//   const [formData, setFormData] = useState(initialValues);
//   const [isLoading, setIsLoading] = useState(false);
//   const [err, setErr] = useState<Partial<validatorProps>>({});

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (event: React.SyntheticEvent) => {
//     setIsLoading(true);
//     event.preventDefault();
//     await new Promise((r) => setTimeout(r, 1000));
//     const errors = checkValidator(formData as Partial<validatorProps>);
//     setErr(errors);
//     setIsLoading(false);
//   };

//   const resetForm = () => {
//     setFormData(initialValues);
//   };

//   return { formData, handleChange, handleSubmit, resetForm, err, isLoading };
// };

// export default useForm;
