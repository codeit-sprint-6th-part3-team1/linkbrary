import { useState } from 'react';

import type { validatorProps } from '@/types';

import { checkValidator } from '@/utils/checkValidator';

interface UseFormProps {
  initialValues: { [key: string]: string };
  callback?: (data: any) => Promise<void> | void;
  additionalData?: { [key: string]: string };
}

const useForm = ({ initialValues = {}, callback, additionalData = {} }: UseFormProps) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<validatorProps>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    const validationErrors = checkValidator(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (callback) {
        await callback({ ...formValues, ...additionalData });
      }
      setFormValues(initialValues);
    } else {
      setErrors(validationErrors);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setErrors({});
  };

  return {
    formValues,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
