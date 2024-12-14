import { CalendarDay } from '@/app/component/Calendar/Calendar.types';
import { AppointmentType } from '@/app/pages/Calendar';
import React from 'react';

interface CalendarCellProps {
  day: CalendarDay;
  onDateSelect?: (item: AppointmentType) => void;
  appointments: AppointmentType[];
}

const CalendarCell: React.FC<CalendarCellProps> = ({
  day,
  onDateSelect,
  appointments,
}) => {
  const { day: dayNumber, isCurrentMonth, isToday } = day;

  return (
    <td
      className={`p-2 border relative
        ${!isCurrentMonth ? 'text-gray-400' : ''}
        ${isToday ? 'bg-blue-200 font-bold' : ''}
        ${
          isCurrentMonth ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-default'
        }
      `}
      style={{
        width: '100px', // Set fixed width
        height: '100px', // Set fixed height
      }}
    >
      <p className="absolute top-2 right-2"> {dayNumber}</p>
      <div
        className="flex-1 overflow-auto h-full no-scrollbar"
        style={{
          scrollbarWidth: 'none', // For Firefox
          msOverflowStyle: 'none', // For IE/Edge
        }}
      >
        {appointments.length > 0 &&
          appointments.map((appointment, idx) => (
            <p
              onClick={() => onDateSelect && onDateSelect(appointment)}
              key={idx}
              className="border px-2 flex-1 w-[90%] break-words"
            >
              {appointment.userName}
            </p>
          ))}
      </div>
    </td>
  );
};

export default CalendarCell;
