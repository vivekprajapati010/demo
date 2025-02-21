import { useState, ChangeEvent } from "react";
import { FormErrors, FormTouched } from "../types/common";

export const useFormValidation = (
  initialValues: { [key: string]: string },
  validateFn: (name: string, value: string) => string
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateFn(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isValid = () => {
    const newErrors: FormErrors = {};
    Object.keys(values).forEach((key) => {
      const error = validateFn(key, values[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const clearError = () => {
    setTouched({});
    setErrors({});
  };

  const resetForm = () => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  };
  return {
    values,
    errors,
    touched,
    handleChange,
    isValid,
    clearError,
    resetForm,
  };
};
