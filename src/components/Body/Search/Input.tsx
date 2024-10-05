import React, { memo, useId } from 'react';

interface InputProps {
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Add onKeyDown prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { placeholder, value, onChange, className, onKeyDown }, // Accept onKeyDown in props
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
      onKeyDown={onKeyDown} // Attach onKeyDown to input element
      ref={ref}
      className={`px-4 py-2 ${className}`}
    />
  );
});

export default memo(Input);
