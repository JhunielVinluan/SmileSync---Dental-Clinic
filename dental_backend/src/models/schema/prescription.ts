import { Schema, Types } from "mongoose";

export const prescriptionSchema: Schema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  appointmentId: {
    type: Types.ObjectId,
    required: true,
  },
  dateVisit: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
  medicine: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
