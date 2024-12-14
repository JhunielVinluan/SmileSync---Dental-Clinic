import { WEEKDAYS } from '@/app/component/Calendar/Calendar.constant';
import {
  CalendarDay,
  CalendarProps,
} from '@/app/component/Calendar/Calendar.types';
import { generateCalendarDays } from '@/app/component/Calendar/Calendar.utils';
import CalendarRow from '@/app/component/Calendar/CalendarRow';
import React, { useMemo } from 'react';

const Calendar: React.FC<CalendarProps> = ({
  currentDate = new Date(),
  onDateSelect,
  appointments,
}) => {
  // Memoize calendar days
  const calendarDays = useMemo(
    () => generateCalendarDays(currentDate, appointments),
    [currentDate, appointments], // Add `appointments` to dependencies
  );

  // Divide calendar days into weeks, limiting to 5 rows
  const weeks = calendarDays
    .reduce<CalendarDay[][]>((acc, day, index) => {
      const weekIndex = Math.floor(index / 7);
      if (!acc[weekIndex]) {
        acc[weekIndex] = [];
      }
      acc[weekIndex].push(day);
      return acc;
    }, [])
    .slice(0, 5);

  return (
    <div className="bg-white shadow-md rounded-lg ">
      {/* Calendar Grid */}
      <table className="w-full border-collapse table-fixed relative">
        {/* Weekday Headers */}
        <thead>
          <tr>
            {WEEKDAYS.map((day) => (
              <th
                key={day}
                className="p-2 text-center font-semibold text-gray-600"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>

        {/* Calendar Body */}
        <tbody>
          {weeks.map((week, weekIndex) => {
            return (
              <CalendarRow
                key={weekIndex}
                week={week}
                onDateSelect={onDateSelect}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
