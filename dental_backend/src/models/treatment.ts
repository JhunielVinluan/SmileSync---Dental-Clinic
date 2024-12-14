import { treatmentSchema } from '@/models/schema/treatment';
import { Document, model } from 'mongoose';

export interface ITreatment {
  userId: string;
  teethNo: string;
  description: string;
  fees: string;
  remarks: string;
  appointmentId: string;
  treatment: string
}

export interface TreatmentDoc extends ITreatment, Document { }

export const TreatmentModel = model<TreatmentDoc>('Treatment', treatmentSchema);
