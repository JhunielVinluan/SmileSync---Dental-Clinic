import { Document, model } from 'mongoose';
import { appointmentSchema } from './schema/appointment';

export interface IAppointment {
  userId: string;
  doctorId: string;
  appointmentDate: Date;
  timeStart: string;
  timeEnd: string;
  minutesDuration?: string;
  service: string;
  appointmentStatus: string;
  appointmentType: string;
  description?: string;
  healthDeclaration?: [
    {
      item: number,
      answer: string,
      specify: string
    }
  ];
}

export interface AppointmentDoc extends IAppointment, Document { }
export const AppointmentModel = model<AppointmentDoc>('Appointment', appointmentSchema);
