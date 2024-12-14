import { UserSchema } from '@/schema/form.schema';
import { z } from 'zod';

export interface IUser {
  firstName: string;
  middleName: string;
  age: number;
  lastName: string;
  gender: string;
  civilStatus: string;
  contactNumber: string;
  address: string;
  email: string;
  userImage?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  birthdate: string;
}

export type UserSchemaType = z.infer<typeof UserSchema>;
