import { Label } from '@/components/ui/label'; // Adjust the import path as necessary
import { UseFormRegister } from 'react-hook-form';
interface ISelectProps {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[]; // Array of options for the select input
  register: UseFormRegister<any>;
  error?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (e: any) => void;
}

const SelectInput = ({
  label,
  name,
  options,
  register,
  error,
  className = '',
  defaultValue,
  onChange,
}: ISelectProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        {...register(name)}
        onChange={onChange}
        className={`selectInput flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed [&>span]:line-clamp-1 ${
          error ? 'input-error' : ''
        }`}
      >
        {defaultValue ? (
          <option value={defaultValue}>{defaultValue}</option>
        ) : (
          <option value="">Select an option</option>
        )}
        {options.map((option) => (
          <option className="" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectInput;
