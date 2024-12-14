import { Schema } from 'mongoose';

export const userSchema: Schema = new Schema(
  {
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    civilStatus: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    role:{
      type: String,
      required: true,
      default: 'patient',
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: '',
      required: false,
    },
    tokenExpire: {
      type: Boolean,
      default: true,
      required: false,
    },
    userImage: {
      asset_id: { type: String, required: false, default: '' },
      public_id: { type: String, required: false, default: '' },
      secure_url: { type: String, required: false, default: '' },
    },
    birthdate: {  // Added birthday field
      type: Date,
      required: true,  // You can make this optional if needed
    },
  },
  {
    timestamps: true,
  },
);
