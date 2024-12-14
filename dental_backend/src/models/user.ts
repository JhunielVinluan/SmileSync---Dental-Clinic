import { Document, model } from 'mongoose';
import { userSchema } from './schema/user';

export interface IUser {
  firstName: string;
  lastName: string;
  middleName: string;
  age: number;
  gender: string;
  civilStatus: string;
  contactNumber: string;
  address: number;
  email: string;
  password: string;
  token?: string;
  tokenExpire?: boolean;
  isVerified: boolean;
  role?: string;
  userImage?: {
    asset_id: string;
    public_id: string;
    secure_url: string;
  };
  birthdate: Date;
}

export interface UserDoc extends IUser, Document {}

export const UserModel = model<UserDoc>('User', userSchema);
