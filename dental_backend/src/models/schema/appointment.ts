import { Schema } from 'mongoose';

const healthDeclarationSchema = new Schema(
  {
    item:{
      type: Number,
      required: false
    },
    answer: {
      type: String,
      required: false,
    },
    specify: {
      type: String,
      required: false,
    },
  },
  { _id: false } // Optionally, don't create separate _id for each subdocument
);

export const appointmentSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeStart: {
      type: String,
      required: true,
    },
    timeEnd: {
      type: String,
      required: true,
    },
    minutesDuration: {
      type: String,
      required: true,
      default: '60',
    },
    service: {
      type: String,
      required: true,
    },
    appointmentStatus: {
      type: String,
      required: true,
    },
    appointmentType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    healthDeclaration: {
      type: [healthDeclarationSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
