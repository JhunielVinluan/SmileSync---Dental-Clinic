interface TextInputProps {
  name: string;
  label: string;
  type?: string;
  register?: any; // Adjust type as per react-hook-form's `register` type
  error?: string | undefined;
  value?: string; // For controlled updates
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // For manual handling
  className?: string;
  maxLength?: number;
  defaultValue?: string;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  type = 'text',
  register,
  error,
  value,
  onChange,
  className,
  maxLength,
  disabled,
  defaultValue,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-2 font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...(register ? register(name) : {})} // Use react-hook-form's register if provided
        defaultValue={defaultValue}
        value={value} // Controlled updates
        onChange={onChange} // Custom handler
        className="px-4 py-2 border rounded"
        maxLength={maxLength}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextInput;
