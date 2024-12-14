import { prescriptionSchema } from '@/models/schema/prescription';
import { Document, model } from 'mongoose';

export interface IPrescription {
    userId: string;
    dateVisit: Date;
    notes: string;
    medicine: string;
    appointmentId: string;
}

export interface PrescriptionDoc extends IPrescription, Document { }

export const PrescriptionModel = model<PrescriptionDoc>('Prescription', prescriptionSchema);
