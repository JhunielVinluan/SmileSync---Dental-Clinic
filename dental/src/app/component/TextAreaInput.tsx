import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UseFormRegister } from 'react-hook-form';

interface ITextInputProps {
  label: string;
  register: UseFormRegister<any>;
  error?: string;
  name: string;
  className?: string;
  defaultValue?: string;
}
const TextAreaInput = ({
  label,
  name,
  register,
  error,
  className = '',
  defaultValue,
}: ITextInputProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        {...register(name)}
        defaultValue={defaultValue}
        className={error ? 'input-error' : ''}
      />
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
};

export default TextAreaInput;
