export type EnvironmentType = 'DEV' | 'PROD';
export type ActionType = 'create' | 'view' | 'edit' | 'delete' | null;

export type userDataDropDown = {
  id: string;
  email: string;
  label: string;
  value: string;
  fullName: string;
};

type UserImage = {
  asset_id: string;
  public_id: string;
  secure_url: string;
};

export type User = {
  userImage: UserImage;
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  gender: string; // Assuming possible gender values
  civilStatus: string; // Adjust according to possible statuses
  contactNumber: string;
  role: string; // Adjust roles as necessary
  address: string;
  email: string;
  birthdate: string;
};
