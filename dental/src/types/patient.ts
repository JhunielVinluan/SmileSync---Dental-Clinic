export type PatientInfo = {
  _id?: string;
  linkUserId?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  gender: string;
  contactNumber: string;
  address: string;
  createdAt: string;
  birthdate: string;
  email: string;
};

export type UserAccountType = {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  contactNumber: string;
  address: string;
  isVerified: boolean;
};
