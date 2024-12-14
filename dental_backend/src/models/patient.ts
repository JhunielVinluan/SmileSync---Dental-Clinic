import { Document, model } from "mongoose";
import { patientSchema } from "@/models/schema/patient";

export interface IPatient {
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  gender: string;
  contactNumber: string;
  address: string;
  civilStatus: string;
  linkUserId?: string;
  birthdate: Date;
  email: string;
}

export interface PatientDoc extends Document, IPatient { }
export const PatientModel = model<PatientDoc>("Patient", patientSchema);
