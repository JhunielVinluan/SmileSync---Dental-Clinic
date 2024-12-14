import { Schema, Types } from "mongoose";

export const notificationSchema: Schema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});
