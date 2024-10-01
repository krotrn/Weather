import React, { useId } from 'react';

interface InputProps {
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { placeholder, value, onChange, className },
  ref
) {
  const id = useId();

  return (
    <input
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      ref={ref}
      className={`px-4 py-2 ${className}`}
    />
  );
});

export default Input;
