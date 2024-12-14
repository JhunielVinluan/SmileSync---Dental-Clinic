interface ISelectProps {
  name: string;
  options: {
    value: string;
    label: string;
  }[]; // Array of options for the select input
  className?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const Selection = ({
  name,
  options,
  className = '',
  defaultValue,
  disabled,
  onChange,
}: ISelectProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      <select
        onChange={(e) => onChange(e)}
        id={name}
        className={`selectInput flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed [&>span]:line-clamp-1`}
        disabled={disabled}
      >
        {defaultValue ? (
          <option value={defaultValue}>{defaultValue}</option>
        ) : (
          <option value="" disabled>
            Select an option
          </option>
        )}
        {options.map((option) => (
          <option className="" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selection;
