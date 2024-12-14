import { v2 as cloudinary } from 'cloudinary';
import { Request, Response } from 'express';
import { IEmail, VerifyToken } from '../interface/services';
import { sendEmail } from '../services/email';
import {
  createUser,
  deleteUser,
  forgotPassword,
  getAccount,
  getOneUser,
  getUser,
  loginUser,
  updatePassword,
  updateUser,
  updateUserImage,
  userAccountValidation,
  verifyToken,
} from '../services/user';


export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'All fields are required' });
    }
    const user = await loginUser({ email, password });
    if (!user) {
      res.status(234).json({ message: 'User does not Exists' });
    }
    res.status(200).json({ isVerified: user?.isVerified, message: 'User Found', role: user?.role, id: user?._id, userImage: user?.userImage, fullName: user?.firstName + ' ' + user?.lastName });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { password, oldPassword } = req.body
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
}


export const updatePasswordController = async (req: Request, res: Response) => {
  try {
    const { password, token } = req.body;
    if (!password || !token) {
      return res.status(400).json({ message: 'Token and password are required' });
    }

    const verify = (await verifyToken({ token })) as VerifyToken;
    console.log(verify);
    let { status, message } = verify;
    if (!status) {
      res.status(234).json({ message: message });
    }

    const user = await updatePassword({
      password,
      _id: verify._id,
    });

    if (!user) {
      return res.status(400).json({ message: 'Password failed to update' });
    }

    res.status(200).json({ message: 'Password updated' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const verifyTokenController = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const verify = await verifyToken({ token });
    let { status, message } = verify;

    if (!status) {
      res.status(234).json({ message });
    }

    res.status(200).json({ message: 'Token Verified' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'All fields are required' });
    }

    const token = await forgotPassword({ email });
    let { status, message, tokenG } = token;

    if (!status) {
      res.status(234).json({ message });
    } else {
      const data: IEmail = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset Password',
        text: `Congratulations your Token is ${tokenG} from dental psu.`,
      };
      const statusEmail = await sendEmail(data);
      if (!statusEmail) {
        res.status(400).json({ message: 'Token and Email Failed to Sent' });
      }
      res.status(200).json({ message: 'Token Sent', token: tokenG });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const user = await getUser();
    res.status(200).json({ user });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getAccountController = async (req: Request, res: Response) => {
  try {
    const user = await getAccount();
    res.status(200).json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const userAccountController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;
    if (!id) {
      res.status(400).json({ message: 'ID fields are required' });
    }

    const user = await userAccountValidation({
      id, isVerified
    });
    res.status(200).json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getOneUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getOneUser({ id });
    if (!user) {
      res.status(234).json({ message: `User does not Exists with id: ${id}` });
    }
    res.status(200).json({ user });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

const containsHttps = (url: string): boolean => url.includes("https");

export const updateOneUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, newPassword, userImage, middleName, age, gender, civilStatus, contactNumber, address, email, birthdate } = req.body;
    if (!firstName || !lastName || !civilStatus || !contactNumber || !address || !email || !gender || !birthdate) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await updateUser({
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
      password: newPassword,
      userImage,
      birthdate
    });
    if (!user) {
      return { message: `User with id ${id} is not found` };
    }
    const contain = containsHttps(userImage);
    if (id && !contain) {
      const imageResult = await saveImage(id, userImage);
      if (imageResult) {
        const { asset_id, public_id, secure_url } = imageResult;
        const updateUserImg = await updateUserImage({ user_id: id, asset_id, public_id, secure_url });

        if (!updateUserImg) {
          return res.status(200).json({ message: 'User created, but photo failed to upload' });
        }

        return res.status(200).json({ user: updateUserImg, message: 'User created and photo uploaded' });
      } else {
        return res.status(500).json({ message: 'User created, but photo upload failed' });
      }
    }



    res.status(200).json({ user });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const deleteOneUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await deleteUser({ id });
    res.status(200).json({ user });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const saveImage = async (user_id: string, userImage: string) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });

    const uploadResult = await cloudinary.uploader.upload(userImage, {
      folder: 'dental',
      public_id: `${user_id}_image`,
    });

    if (uploadResult) {
      const { asset_id, public_id, secure_url } = uploadResult;
      return { asset_id, public_id, secure_url };
    }
  } catch (error) {
    console.error('Image upload failed:', error);
    return null;
  }
};

// Main controller function
export const createUserController = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, middleName, age, gender, civilStatus, contactNumber, address, email, password, userImage, birthdate } = req.body;
    const dataEmail = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome to Dental Clinic',
      text: `Dear ${firstName} ${lastName},
        Thank you for creating an account with SMILESYNC at Ramos Vallao-Dental Clinic. Your account is currently under review by our administrators. You will receive an email notification once your account has been approved.
        In the meantime, if you have any questions, please feel free to contact us at smilesyncvallaodentalclinic@gmail.com

        Sincerely,
        The SMILESYNC Team
`
    }
    if (!firstName || !lastName || !middleName || !age || !gender || !civilStatus || !contactNumber || !address || !email || !password || !userImage || !birthdate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await createUser({ firstName, lastName, middleName, age, gender, civilStatus, contactNumber, address, email, password, birthdate });
    const { status, message, user_id } = user;

    if (!status) {
      return res.status(234).json({ message });
    }

    if (user_id) {
      const imageResult = await saveImage(user_id, userImage);
      sendEmail(dataEmail)
      if (imageResult) {
        const { asset_id, public_id, secure_url } = imageResult;
        const updateUserImg = await updateUserImage({ user_id, asset_id, public_id, secure_url });
        if (!updateUserImg) {
          return res.status(200).json({ message: 'User created, but photo failed to upload' });
        }

        return res.status(200).json({ message: 'User created and photo uploaded' });
      } else {
        return res.status(500).json({ message: 'User created, but photo upload failed' });
      }
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};