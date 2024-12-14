import { Types } from 'mongoose';
import { IUser } from '../models/user';
import { IAppointment } from '../models/appointment';
import { IPatient } from '@/models/patient';
import { ISurgical } from '@/models/surgical';

export interface BaseParameter {
  id: Types.ObjectId | string;
}

export interface CreateUserParameter {
  firstName: IUser['firstName'];
  middleName: IUser['middleName'];
  lastName: IUser['lastName'];
  age: IUser['age'];
  gender: IUser['gender'];
  civilStatus: IUser['civilStatus'];
  contactNumber: IUser['contactNumber'];
  address: IUser['address'];
  email: IUser['email'];
  password: IUser['password'];
  birthdate: IUser['birthdate'];
}

export interface UpdateUserParameter extends BaseParameter {
  firstName?: IUser['firstName'];
  middleName?: IUser['middleName'];
  lastName?: IUser['lastName'];
  age?: IUser['age'];
  gender?: IUser['gender'];
  civilStatus?: IUser['civilStatus'];
  contactNumber?: IUser['contactNumber'];
  address?: IUser['address'];
  email?: IUser['email'];
  password?: IUser['password'];
  userImage?: {
    asset_id: string;
    public_id: string;
    secure_url: string;
  };
  birthdate: IUser['birthdate'];
}

export interface BaseLoginParameter {
  email: IUser['email'];
  password: IUser['password'];
}

export interface UpdatePasswordParameter {
  _id: Types.ObjectId | string | undefined;
  password: IUser['password'];
}

export interface EmailParameter {
  email: IUser['email'];
}

export interface IEmail {
  from: string | undefined;
  to: string;
  subject: string;
  text: string;
}
export interface TokenParameter {
  token: string;
}

export interface VerifyToken {
  status: boolean;
  message: string;
  _id?: Types.ObjectId | string | undefined;
}

export interface CreateAppointmentParameter {
  userId: IAppointment['userId'];
  doctorId: IAppointment['doctorId'];
  appointmentDate: IAppointment['appointmentDate'];
  timeStart: IAppointment['timeStart'];
  timeEnd: IAppointment['timeEnd'];
  minutesDuration?: IAppointment['minutesDuration'];
  service: IAppointment['service'];
  appointmentStatus: IAppointment['appointmentStatus'];
  appointmentType: IAppointment['appointmentType'];
  description?: IAppointment['description'];
  healthDeclaration?: IAppointment['healthDeclaration'];
}

export interface UpdateAppointmentParameter extends Partial<CreateAppointmentParameter> {
  id: BaseParameter;
}

export interface CreatePatientParameter {
  firstName: IPatient['firstName'];
  middleName: IPatient['middleName'];
  lastName: IPatient['lastName'];
  age: IPatient['age'];
  gender: IPatient['gender'];
  contactNumber: IPatient['contactNumber'];
  address: IPatient['address'];
  civilStatus: IPatient['civilStatus'];
  linkUserId: IPatient['linkUserId'];
  birthdate: IPatient['birthdate'];
  email: IPatient['email'];
}

export interface UpdatePatientParameter extends Partial<CreatePatientParameter> {
  id: BaseParameter;
  birthdate: IPatient['birthdate'];
  email: IPatient['email'];
}

export interface CreateSurgicalParameter {
  name: ISurgical['name'];
  description: ISurgical['description'];
  status: ISurgical['status'];
}

export interface UpdateSurgicalParameter extends Partial<CreateSurgicalParameter> {
  id: BaseParameter;
}
