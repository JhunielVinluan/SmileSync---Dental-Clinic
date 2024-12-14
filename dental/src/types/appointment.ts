import {
  AppointmentSchema,
  PatientSchema,
  PrescriptionSchema,
  ScheduleSchema,
  TreatmentSchema,
} from '@/schema/form.schema';
import { z } from 'zod';

export type AppointmentTypes = {
  status: string;
  description: string;
  time: number;
  date: string;
};

export type DataStructure = {
  [key: string]: AppointmentTypes[];
};

export const TIME_DURATION = [15, 30, 45, 60];

export type DURATION_TYPES = { value: string; label: string };

export const MINUTE_DURATION_15 = [
  { value: '06:00', label: '06:00 AM' },
  { value: '06:15', label: '06:15 AM' },
  { value: '06:30', label: '06:30 AM' },
  { value: '06:45', label: '06:45 AM' },
  { value: '07:00', label: '07:00 AM' },
  { value: '07:15', label: '07:15 AM' },
  { value: '07:30', label: '07:30 AM' },
  { value: '07:45', label: '07:45 AM' },
  { value: '08:00', label: '08:00 AM' },
  { value: '08:15', label: '08:15 AM' },
  { value: '08:30', label: '08:30 AM' },
  { value: '08:45', label: '08:45 AM' },
  { value: '09:00', label: '09:00 AM' },
  { value: '09:15', label: '09:15 AM' },
  { value: '09:30', label: '09:30 AM' },
  { value: '09:45', label: '09:45 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '10:15', label: '10:15 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '10:45', label: '10:45 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '11:15', label: '11:15 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '11:45', label: '11:45 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '12:15', label: '12:15 PM' },
  { value: '12:30', label: '12:30 PM' },
  { value: '12:45', label: '12:45 PM' },
  { value: '01:00', label: '01:00 PM' },
  { value: '01:15', label: '01:15 PM' },
  { value: '01:30', label: '01:30 PM' },
  { value: '01:45', label: '01:45 PM' },
  { value: '02:00', label: '02:00 PM' },
  { value: '02:15', label: '02:15 PM' },
  { value: '02:30', label: '02:30 PM' },
  { value: '02:45', label: '02:45 PM' },
  { value: '03:00', label: '03:00 PM' },
  { value: '03:15', label: '03:15 PM' },
  { value: '03:30', label: '03:30 PM' },
  { value: '03:45', label: '03:45 PM' },
  { value: '04:00', label: '04:00 PM' },
  { value: '04:15', label: '04:15 PM' },
  { value: '04:30', label: '04:30 PM' },
  { value: '04:45', label: '04:45 PM' },
  { value: '05:00', label: '05:00 PM' },
];

export const MINUTE_DURATION_30 = [
  { value: '07:00', label: '07:00 AM' },
  { value: '07:30', label: '07:30 AM' },
  { value: '08:00', label: '08:00 AM' },
  { value: '08:30', label: '08:30 AM' },
  { value: '09:00', label: '09:00 AM' },
  { value: '09:30', label: '09:30 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '12:30', label: '12:30 PM' },
  { value: '01:00', label: '01:00 PM' },
  { value: '01:30', label: '01:30 PM' },
  { value: '02:00', label: '02:00 PM' },
  { value: '02:30', label: '02:30 PM' },
  { value: '03:00', label: '03:00 PM' },
  { value: '03:30', label: '03:30 PM' },
  { value: '04:00', label: '04:00 PM' },
  { value: '04:30', label: '04:30 PM' },
  { value: '05:00', label: '05:00 PM' },
];

export const MINUTE_DURATION_45 = [
  { value: '07:00', label: '07:30 AM' },
  { value: '08:15', label: '08:15 AM' },
  { value: '09:00', label: '09:00 AM' },
  { value: '09:45', label: '09:45 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '11:15', label: '11:15 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '12:45', label: '12:45 PM' },
  { value: '01:30', label: '01:30 PM' },
  { value: '02:15', label: '02:15 PM' },
  { value: '03:00', label: '03:00 PM' },
  { value: '03:45', label: '03:45 PM' },
  { value: '04:30', label: '04:30 PM' },
];

export const MINUTE_DURATION_60 = [
  { value: '07:00 AM', label: '07:00 AM' },
  { value: '08:00 AM', label: '08:00 AM' },
  { value: '09:00 AM', label: '09:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  { value: '12:00 PM', label: '12:00 PM' },
  { value: '01:00 PM', label: '01:00 PM' },
  { value: '02:00 PM', label: '02:00 PM' },
  { value: '03:00 PM', label: '03:00 PM' },
  { value: '04:00 PM', label: '04:00 PM' },
  { value: '05:00 PM', label: '05:00 PM' },
];

export const MINUTE_INTERVALS = [
  { value: '15', label: '15 Minutes' },
  { value: '30', label: '30 Minutes' },
  { value: '45', label: '45 Minutes' },
  { value: '60', label: '60 Minutes' },
];

export type AppointmentData = {
  _id?: string;
  fullName: string;
  date: Date;
  transactionType: string;
  duration: string;
  startTime: string;
  endTime: string;
  description: string;
};

export type AppointmentInfo = {
  _id?: string;
  fullName: string;
  date: Date;
  transactionType: string;
  duration: string;
  startTime: string;
  endTime: string;
  description: string;
  appointmentDate?: string;
  timeStart: string;
  timeEnd: string;
  appointmentStatus?: string;
  service?: string;
  userFullName?: string;
};

export type PatientSchemaType = z.infer<typeof PatientSchema>;

export interface PatientFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export type AppointmentSchemaType = z.infer<typeof AppointmentSchema>;
export type TreatmentSchemaType = z.infer<typeof TreatmentSchema>;
export type ScheduleSchemaType = z.infer<typeof ScheduleSchema>;
export type PrescriptionSchemaType = z.infer<typeof PrescriptionSchema>;

export interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

export type NotificationData = {
  _id: string;
  userId: string;
  appointmentDate: string;
  appointmentType: string;
  service: string;
  userName: string;
};

export type newAppointmentType = {
  _id?: string;
  userId: string;
  doctorId: string;
  appointmentDate: string;
  timeStart: string;
  timeEnd: string;
  minutesDuration: string;
  service: string;
  appointmentStatus: string;
  appointmentType: string;
  userFullName?: string;
  treatment?: string
};

export type TreatmentInfoType = {
  _id?: string;
  userId: string;
  userFullName: string;
  teethNo: string;
  description: string;
  fees: string;
  remarks: string;
};

export type ScheduleInfoType = {
  _id?: string;
  doctorId: string;
  userFullName: string;
  day: string;
  startTime: string;
  duration: string;
  userImage: string;
};

export type PrescriptionInfoType = {
  _id?: string;
  dateVisit: string;
  notes: string;
  medicine: string;
  userImage?: string;
  userFullName?: string;
  userAge?: number;
  userAddress?: string;
  userGender?: string;
};
