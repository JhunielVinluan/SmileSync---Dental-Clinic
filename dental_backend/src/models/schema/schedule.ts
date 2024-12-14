import { Schema, Types } from "mongoose";

export const scheduleSchema: Schema = new Schema({
  doctorId: {
    type: Types.ObjectId,
    required: true,
  },
  day: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});
