import { Schema, Types } from "mongoose";

export const treatmentSchema: Schema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  appointmentId: {
    type: Types.ObjectId,
    required: true,
  },
  teethNo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  treatment: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
