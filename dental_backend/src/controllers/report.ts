import { AppointmentModel } from '@/models/appointment';
import { PatientModel } from '@/models/patient';
import { SurgicalModel } from '@/models/surgical';
import { Request, Response } from 'express';
import mongoose, { Mongoose } from 'mongoose';

export const getAllRecords = async (req: Request, res: Response) => {
  try {
    const appointmentPendingData = await AppointmentModel.find({
      appointmentStatus: 'Pending',
    });
    const appointmentCompletedData = await AppointmentModel.find({
      appointmentStatus: 'Complete',
    });
    const surgicalData = await SurgicalModel.find({});
    const patientData = await PatientModel.find({});
    res.status(200).json({
      appointmentPendingData: appointmentPendingData.length,
      appointmentCompletedData: appointmentCompletedData.length,
      surgicalData: surgicalData.length,
      patientData: patientData.length,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
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
          service: 1,
          appointmentType: 1,
          userName: {
            $concat: ['$UserInfo.firstName', ' ', '$UserInfo.lastName'],
          },
        },
      },
    ]);
    res.status(200).json(appointment);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};


export const getNotificationsByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract user ID from request parameters

    const appointments = await AppointmentModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(id) }, // Match only appointments with the given userId
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
          service: 1,
          createdAt:1,
          appointmentType: 1,
          userName: {
            $concat: ['$UserInfo.firstName', ' ', '$UserInfo.lastName'],
          },
        },
      },
    ]);

    res.status(200).json(appointments);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    } else {
      console.error(err);
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
};
