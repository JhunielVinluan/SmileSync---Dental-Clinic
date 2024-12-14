import { AppointmentModel } from '@/models/appointment';
import { BaseParameter, CreateAppointmentParameter, UpdateAppointmentParameter } from '../interface/services';
import { UserModel } from '@/models/user';
import mongoose from 'mongoose';

export const getAppointment = async () => {
  return await AppointmentModel.find({});
};

export const hasUpcomingAppointments = async ({
  userId,
}: {
  userId: string;
}) => {
  return await AppointmentModel.findOne({
    userId,
    appointmentStatus: { $nin: ['Completed', 'Complete', 'Completed'] }, // Exclude "completed" appointments
  });
};

export const existingAppointment = async ({
  userId,
  appointmentDate,
}: {
  userId: string;
  appointmentDate: string;
}) => {
  const startOfDay = new Date(appointmentDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(appointmentDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

  return await AppointmentModel.findOne({
    userId,
    appointmentDate: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });
};

export const getUserAppointment = async ({ id }: BaseParameter) => {
  const objectId = new mongoose.Types.ObjectId(id);

  const result = await AppointmentModel.aggregate([
    { $match: { userId: objectId } },

    // Lookup the user information from the UserModel
    {
      $lookup: {
        from: "users", // Collection name for UserModel
        localField: "userId",
        foreignField: "_id",
        as: "userInfo"
      }
    },

    // Unwind userInfo array to access user data directly
    { $unwind: "$userInfo" },

    // Add fullName field to each appointment document
    {
      $addFields: {
        userFullName: {
          $concat: [
            "$userInfo.firstName", " ",
            { $ifNull: ["$userInfo.middleName", ""] }, " ",
            "$userInfo.lastName"
          ]
        }
      }
    },

    // Project only the necessary fields
    {
      $project: {
        _id: 1,
        userId: 1,
        doctorId: 1,
        appointmentDate: 1,
        timeStart: 1,
        timeEnd: 1,
        minutesDuration: 1,
        service: 1,
        appointmentStatus: 1,
        appointmentType: 1,
        description: 1,
        healthDeclaration: 1,
        createdAt: 1,
        updatedAt: 1,
        userFullName: 1
      }
    }
  ]);

  return result;
};

export const calendarAppointment = async () => {
  const appointment = await AppointmentModel.aggregate([
    {
      $match: {
        appointmentStatus: { $ne: 'Canceled' }, // Exclude canceled appointments
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'UserInfo',
      },
    },
    {
      $unwind: '$UserInfo',
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        appointmentDate: 1,
        timeStart: 1,
        timeEnd: 1,
        service: 1,
        appointmentStatus: 1,
        minutesDuration: 1,
        appointmentType: 1,
        userPhoneNumber: "$UserInfo.contactNumber",
        userEmail: "$UserInfo.email",
        userName: {
          $concat: ['$UserInfo.firstName', ' ', '$UserInfo.lastName'],
        },
        dateCode: {
          $dateToString: {
            format: '%Y%m%d',
            date: '$appointmentDate',
          },
        },
      },
    },
  ]);
  const confirmedAppointments = await AppointmentModel.find({ appointmentStatus: 'Confirmed' });
  const PendingAppointments = await AppointmentModel.find({ appointmentStatus: 'Pending' });
  return { appointment, confirmedAppointments: confirmedAppointments.length, PendingAppointments: PendingAppointments.length };
};

export const getFormattedAppointment = async () => {
  const appointment = await AppointmentModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'UserInfo',
      },
    },
    {
      $unwind: '$UserInfo',
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        appointmentDate: 1,
        timeStart: 1,
        timeEnd: 1,
        service: 1,
        appointmentStatus: 1,
        minutesDuration: 1,
        appointmentType: 1,
        userName: {
          $concat: ['$UserInfo.firstName', ' ', '$UserInfo.lastName'],
        },
        dateCode: {
          $dateToString: {
            format: '%Y%m%d',
            date: '$appointmentDate',
          },
        },
      },
    },
  ]);
  return appointment;
};
export const getAppointmentByType = async ({ type }: { type: string }) => {
  const result = await AppointmentModel.aggregate([
    { $match: { appointmentType: type } },

    // Lookup the user information from the UserModel
    {
      $lookup: {
        from: "users", // Collection name for UserModel
        localField: "userId",
        foreignField: "_id",
        as: "userInfo"
      }
    },

    // Unwind userInfo array to access user data directly
    { $unwind: "$userInfo" },

    // Add fullName field to each appointment document
    {
      $addFields: {
        userFullName: {
          $concat: [
            "$userInfo.firstName", " ",
            { $ifNull: ["$userInfo.middleName", ""] }, " ",
            "$userInfo.lastName"
          ]
        }
      }
    },

    // Project only the necessary fields
    {
      $project: {
        _id: 1,
        userId: 1,
        doctorId: 1,
        appointmentDate: 1,
        timeStart: 1,
        timeEnd: 1,
        minutesDuration: 1,
        service: 1,
        appointmentStatus: 1,
        appointmentType: 1,
        description: 1,
        healthDeclaration: 1,
        createdAt: 1,
        updatedAt: 1,
        userFullName: 1
      }
    }
  ]);
  return result
};

export const getOneAppointment = async ({ id }: BaseParameter) => {
  return await AppointmentModel.findById(id);
};

export const latestAppointment = async ({ id }: BaseParameter) => {
  return await AppointmentModel.findOne({ userId: id }).sort({ createdAt: -1 });
};

export const createAppointment = async ({
  userId,
  doctorId,
  appointmentDate,
  appointmentStatus,
  timeStart,
  timeEnd,
  service,
  description,
  appointmentType,
  minutesDuration,
  healthDeclaration
}: CreateAppointmentParameter) => {
  const data = {
    userId,
    doctorId,
    appointmentDate,
    appointmentStatus,
    appointmentType,
    timeStart,
    timeEnd,
    service,
    description,
    minutesDuration,
    healthDeclaration,
  };
  return await AppointmentModel.create(data);
};

export const updateAppointment = async ({
  id,
  userId,
  doctorId,
  appointmentDate,
  appointmentStatus,
  timeStart,
  timeEnd,
  service,
  description,
  minutesDuration,
}: UpdateAppointmentParameter) => {
  const data = {
    userId,
    doctorId,
    appointmentDate,
    appointmentStatus,
    timeStart,
    timeEnd,
    service,
    description,
    minutesDuration,
  };
  return await AppointmentModel.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteOneAppointment = async ({ id }: BaseParameter) => {
  return await AppointmentModel.findByIdAndDelete(id);
};

export const deleteAllAppointment = async () => {
  return await AppointmentModel.deleteMany({});
};
