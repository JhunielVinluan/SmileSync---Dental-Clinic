import { CalendarDay } from '@/app/component/Calendar/Calendar.types';
import { AppointmentType } from '@/app/pages/Calendar';

export const generateCalendarDays = (
  currentDate: Date,
  appointments: AppointmentType[],
): CalendarDay[] => {
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Helper to match appointments by date
  const getAppointmentsForDate = (date: Date) => {
    if (!Array.isArray(appointments)) {
      console.warn('Appointments is not an array:', appointments);
      return [];
    }
    return appointments.filter(
      (appointment) =>
        new Date(appointment.appointmentDate).toDateString() === date.toDateString(),
    );
  };

  // Generate dates for the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week (0 = Sunday, 6 = Saturday)

  // Generate current month's days
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(year, month, index + 1);
    return {
      date,
      day: index + 1,
      isCurrentMonth: true,
      isToday: date.toDateString() === today.toDateString(),
      appointments: getAppointmentsForDate(date), // Include appointments
    };
  });

  // Generate previous month's days
  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, index) => {
    const date = new Date(
      year,
      month - 1,
      new Date(year, month, 0).getDate() - firstDayOfMonth + index + 1,
    );
    return {
      date,
      day: date.getDate(),
      isCurrentMonth: false,
      isToday: false,
      appointments: getAppointmentsForDate(date), // Include appointments
    };
  });

  // Determine the number of next month days needed to complete 5 rows
  const totalDaysInCalendar = prevMonthDays.length + currentMonthDays.length;
  const remainingCellsFor5Rows = 35 - totalDaysInCalendar;

  const nextMonthDays = Array.from(
    { length: remainingCellsFor5Rows },
    (_, index) => {
      const date = new Date(year, month + 1, index + 1);
      return {
        date,
        day: date.getDate(),
        isCurrentMonth: false,
        isToday: false,
        appointments: getAppointmentsForDate(date), // Include appointments
      };
    },
  );

  // Combine all days
  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};
