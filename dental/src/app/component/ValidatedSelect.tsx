import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IDataItem {
  label: string;
  value: string;
}

interface IValidatedSelectProps {
  id: string;
  name: string;
  errors: string | undefined;
  onChange: (value: string) => void;
  data: IDataItem[];
  className?: string;
}
const ValidatedSelect = ({
  id,
  name,
  errors,
  onChange,
  data,
  className,
}: IValidatedSelectProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 w-full ${className}`}>
      {name && <Label htmlFor={id}>{name}</Label>}
      <Select onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent position="popper">
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-red-500 ">{errors}</p>
    </div>
  );
};

export default ValidatedSelect;
