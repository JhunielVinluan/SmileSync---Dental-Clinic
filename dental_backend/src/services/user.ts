import { UserModel } from '../models/user';
import {
  BaseLoginParameter,
  BaseParameter,
  CreateUserParameter,
  EmailParameter,
  TokenParameter,
  UpdatePasswordParameter,
  UpdateUserParameter,
} from '../interface/services';
import { generateToken } from '../utils/user';
import { Types } from 'mongoose';
import { sendEmail } from '@/services/email';

export const loginUser = async ({ email, password }: BaseLoginParameter) => {
  const user = await UserModel.findOne({ email, password });
  console.log({ user })
  return user;
};

export const getUser = async () => {
  const user = await UserModel.find({});
  return user;
};
export const getUserById = async (id: string) => {
  const user = await UserModel.findById(id);
  return user;
};

export const getAccount = async () => {
  const user = await UserModel.find({
    isVerified: false
  });
  return user;
};

export const userAccountValidation = async ({ id, isVerified }: { id: string; isVerified: boolean }) => {
  if (!isVerified) {
    const user = await UserModel.findByIdAndDelete(
      id
    );
    const { email, firstName } = user as any;
    const dataEmail = {
      from: process.env.EMAIL,
      to: email,
      subject: 'SMILESYNC Account Review - Ramos Vallao-Dental Clinic',
      text: `Dear ${firstName},

      We regret to inform you that your account request for SMILESYNC at Ramos Vallao-Dental Clinic has not been approved at this time.

      The information provided during account creation was found to be inaccurate. Please review your submitted details and ensure they are correct.

      We appreciate your interest in our system. If you have any questions, please feel free to contact us at smilesyncvallaodentalclinic@gmail.com

      Sincerely,
      The SMILESYNC Team`
    }
    sendEmail(dataEmail)
    return user
  } else {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { isVerified },
      { new: true } // Return the updated document
    );
    const { email, firstName } = user as any;
    const dataEmail = {
      from: process.env.EMAIL,
      to: email,
      subject: 'SMILESYNC Account Review - Ramos Vallao-Dental Clinic',
      text: `Dear ${firstName},

      Congratulations! Your account for SMILESYNC at Ramos Vallao-Dental Clinic has been approved.

      You can now access the system by clicking on the following link: https://com-dental.onrender.com/

      We encourage you to explore the features and functionalities of SMILESYNC. If you have any questions, please feel free to contact us at smilesyncvallaodentalclinic@gmail.com 

      Sincerely,
      The SMILESYNC Team`
    }
    sendEmail(dataEmail)
    return user
  }
};



export const getOneUser = async ({ id }: BaseParameter) => {
  const user = await UserModel.findById(id);
  return user;
};

interface UserImage {
  user_id: string | undefined;
  asset_id: string;
  public_id: string;
  secure_url: string;
}

export const updateUserImage = async ({ user_id, asset_id, public_id, secure_url }: UserImage) => {
  if (!user_id) {
    throw new Error('user_id is required');
  }
  return await UserModel.findByIdAndUpdate(user_id, { userImage: { asset_id, public_id, secure_url } }, { new: true });
};

interface CreateUserResponse {
  status: boolean;
  message: string;
  user_id?: string; // This allows user_id to be undefined if status is false
}
export const createUser = async ({
  firstName,
  lastName,
  middleName,
  age,
  gender,
  civilStatus,
  contactNumber,
  address,
  email,
  password,
  birthdate
}: CreateUserParameter): Promise<CreateUserResponse> => {
  const checkEmail = await UserModel.findOne({ email });
  if (checkEmail) {
    return { status: false, message: 'Email Already Exists' };
  }
  const user = await UserModel.create({
    firstName,
    lastName,
    middleName,
    age,
    gender,
    civilStatus,
    contactNumber,
    address,
    email,
    password,
    birthdate
  });

  const user_id = user._id instanceof Types.ObjectId ? user._id.toString() : undefined;
  return { status: true, message: 'Successfully Created', user_id };
};
export const updateUser = async ({
  id,
  firstName,
  lastName,
  middleName,
  age,
  gender,
  civilStatus,
  contactNumber,
  address,
  email,
  password,
  birthdate
}: UpdateUserParameter) => {
  const data = {
    firstName,
    lastName,
    middleName,
    age,
    gender,
    civilStatus,
    contactNumber,
    address,
    email,
    password,
    birthdate
  };
  return await UserModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async ({ id }: BaseParameter) => {
  const user = await UserModel.findByIdAndDelete(id);
  return user;
};

export const updatePassword = async ({ password, _id }: UpdatePasswordParameter) => {
  const changePass = await UserModel.findByIdAndUpdate(_id, {
    password,
    tokenExpire: true,
  });
  return changePass;
};

export const forgotPassword = async ({ email }: EmailParameter) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return { status: false, tokenG: '', message: 'User does not Exists' };
  }
  const generatedToken = generateToken();
  await UserModel.findByIdAndUpdate(user._id, {
    token: generatedToken,
    tokenExpire: false,
  });
  return { status: true, tokenG: generatedToken, message: 'Token Send' };
};

export const verifyToken = async ({ token }: TokenParameter) => {
  const user = await UserModel.findOne({ token });
  if (!user) {
    return { status: false, message: 'Token does not Exists' };
  }
  if (user && user.tokenExpire) {
    return { status: false, message: 'Token Expired' };
  }
  return { status: true, message: 'Token Verified', _id: user?._id };
};
