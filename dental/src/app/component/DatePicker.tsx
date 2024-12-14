import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format, isAfter, isBefore, startOfDay } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

type DatePickerProps = {
  date?: Date;
  setDate: (e: Date) => void;
  label?: string;
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
};

const DatePicker = ({
  date,
  setDate,
  label,
  disablePastDates = false,
  disableFutureDates = false,
}: DatePickerProps) => {
  const today = startOfDay(new Date()); // Ensure we're only comparing dates, not time.

  return (
    <div>
      {label && <Label htmlFor={'date'}>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={`border border-gray-300 rounded px-3 py-2 flex items-center w-full  text-left font-normal ${
              !date ? 'text-gray-500' : ''
            }`}
          >
            {date ? (
              format(date, 'PPP')
            ) : (
              <span className="text-gray-500">Select Date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(e) => {
              if (e) {
                setDate(e);
              }
            }}
            initialFocus
            disabled={(date) =>
              disablePastDates
                ? isBefore(startOfDay(date), today)
                : false || disableFutureDates
                  ? isAfter(startOfDay(date), today)
                  : false
            } // Disable dates before today if the prop is true
          />
        </PopoverContent>
      </Popover>
      {!date && (
        <p className="text-red-500 text-sm">Appointed Date is Required</p>
      )}
    </div>
  );
};

export default DatePicker;
