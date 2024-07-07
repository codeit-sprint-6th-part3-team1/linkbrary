import { useState } from 'react';
import { checkValidator } from '@/utils/checkValidator';
import { validatorProps } from '@/types';

interface UseFormProps<T> {
  inputValue: T;
  onSubmit: (formData: T) => Promise<void>;
}

interface UseFormResult<T> {
  formData: T;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.SyntheticEvent) => void;
  resetForm: () => void;
  errors: Partial<validatorProps>;
  isLoading: boolean;
}

const useForm = <T extends object>({ inputValue, onSubmit }: UseFormProps<T>): UseFormResult<T> => {
  const [formData, setFormData] = useState(inputValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<validatorProps>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const validationErrors = checkValidator(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await onSubmit(formData);
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setFormData(inputValue);
  };

  return { formData, handleChange, handleSubmit, resetForm, errors, isLoading };
};

export default useForm;
