import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

interface IValidatedInputProps {
  id: string;
  type: string;
  name: string;
  errors: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
const ValidatedInput = ({
  id,
  type,
  name,
  errors,
  onChange,
  className,
}: IValidatedInputProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      <Label htmlFor={id}>{name}</Label>
      <Input
        id={id}
        type={type}
        onChange={onChange}
        className={errors ? 'input-error' : ''}
      />
      <p className="text-red-500 text-sm">{errors}</p>
    </div>
  );
};

export default ValidatedInput;
