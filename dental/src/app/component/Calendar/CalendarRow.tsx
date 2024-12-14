import { CalendarDay } from '@/app/component/Calendar/Calendar.types';
import { AppointmentType } from '@/app/pages/Calendar';
import React from 'react';
import CalendarCell from './CalendarCell';

interface CalendarRowProps {
  week: CalendarDay[];
  onDateSelect?: (date: AppointmentType) => void;
}

const CalendarRow: React.FC<CalendarRowProps> = ({ week, onDateSelect }) => {
  return (
    <tr className="relative">
      {week.map((day) => (
        <CalendarCell
          appointments={day.appointments}
          key={day.date.toISOString()}
          day={day}
          onDateSelect={onDateSelect}
        />
      ))}
    </tr>
  );
};

export default CalendarRow;
