import { AppointmentType } from "@/app/pages/Calendar";

export type CalendarDay = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  appointments: AppointmentType[]

};

export type CalendarProps = {
  currentDate?: Date;
  onDateSelect?: (date: AppointmentType) => void;
  appointments: AppointmentType[]
};
