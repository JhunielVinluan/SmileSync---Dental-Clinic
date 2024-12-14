import { scheduleSchema } from '@/models/schema/schedule';
import { Document, model } from 'mongoose';

export interface ISchedule {
  doctorId: string;
  day: string;
  startTime: string;
  duration: string;
}

export interface ScheduleDoc extends ISchedule, Document { }

export const ScheduleModel = model<ScheduleDoc>('Schedule', scheduleSchema);
