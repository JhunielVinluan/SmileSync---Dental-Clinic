import { Request, Response } from 'express';
import {
  calendarAppointment,
  createAppointment,
  deleteAllAppointment,
  deleteOneAppointment,
  existingAppointment,
  getAppointment,
  getAppointmentByType,
  getFormattedAppointment,
  getOneAppointment,
  getUserAppointment,
  hasUpcomingAppointments,
  latestAppointment,
  updateAppointment,
} from '../services/appointment';
import { getUserById } from '@/services/user';
import { sendEmail } from '@/services/email';
import { format } from 'date-fns';

export const getAppointmentController = async (req: Request, res: Response) => {
  try {
    const appointment = await getAppointment();
    res.status(200).json(appointment);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getUserAppointmentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const appointment = await getUserAppointment({ id });
    if (!appointment) {
      res.status(234).json({ message: `Appointment Not Found with id ${id}` });
    }
    res.status(200).json(appointment);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getFormattedAppointmentController = async (req: Request, res: Response) => {
  try {
    const appointment = await getFormattedAppointment();
    res.status(200).json(appointment);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getCalendarController = async (req: Request, res: Response) => {
  try {
    const appointment = await calendarAppointment();
    res.status(200).json(appointment);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getAppointmentByTypeController = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const appointment = await getAppointmentByType({ type });
    res.status(200).json(appointment);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getOneAppointmentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oneAppointment = await getOneAppointment({ id });
    if (!oneAppointment) {
      res.status(400).json({ message: `Appointment Not Found with id ${id}` });
    }
    return res.status(200).json(oneAppointment);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getLatestAppointmentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oneAppointment = await latestAppointment({ id });
    if (!oneAppointment) {
      res.status(234).json({ message: `Appointment Not Found with id ${id}` });
    } else {

      return res.status(200).json(oneAppointment);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};


export const createAppointmentController = async (req: Request, res: Response) => {
  try {
    const { userId, healthDeclaration, doctorId, appointmentDate, appointmentStatus, timeStart, timeEnd, service, description, appointmentType, minutesDuration } =
      req.body;

    const find = await getUserById(userId);
    if (!find) {
      return res.status(234).json({ message: "User Not Found" });
    }
    console.log({ minutesDuration })
    if (
      !userId ||
      !doctorId ||
      !appointmentType ||
      !appointmentDate ||
      !timeStart ||
      !appointmentStatus ||
      !timeEnd ||
      !service ||
      !minutesDuration
    ) {
      res.status(400).json({ message: 'All fields are required' });
    }
    if (!healthDeclaration) {
      res.status(400).json({ message: 'Health Declaration are required' });
    }

    const hasAppointment = await hasUpcomingAppointments({ userId });
    if (hasAppointment) {
      return res
        .status(235)
        .json({ message: "You already have an incomplete/Pending appointment." });
    }

    const existing = await existingAppointment({ userId, appointmentDate });

    if (existing) {
      return res
        .status(234)
        .json({ message: "An appointment on this date already exists for this user" });
    } else {
      const { email, firstName } = find as any;
      const dataEmail = {
        from: process.env.EMAIL,
        to: email,
        subject: 'SMILESYNC Account Review - Ramos Vallao-Dental Clinic',
        text: `Dear ${firstName},
This is a reminder of your upcoming appointment at Ramos Vallao-Dental Clinic on ${format(appointmentDate, 'MMM dd, yyyy')} at ${timeStart} - ${timeEnd}.

We look forward to seeing you!

Sincerely,
The SMILESYNC Team
        `
      }
      sendEmail(dataEmail)
    }

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

    const appointment = await createAppointment(data);
    res.status(200).json({ appointment });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const updateAppointmentController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Appointment Id is required' });
    }
    const { userId, doctorId, appointmentDate, appointmentStatus, timeStart, timeEnd, service, minutesDuration } = req.body;
    if (!userId || !doctorId || !appointmentDate || !timeStart || !appointmentStatus || !timeEnd || !service || !minutesDuration) {
      res.status(400).json({ message: 'All fields are required' });
    }
    const updateData = { ...data, id };
    const appointment = await updateAppointment(updateData);
    res.status(200).json(appointment);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const deleteOneAppointmentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const checkAppointment = await getOneAppointment({ id });
    if (!checkAppointment) {
      res.status(400).json({ message: `Appointment Not Found with id ${id}` });
    }
    const oneAppointment = await deleteOneAppointment({ id });
    if (!oneAppointment) {
      res.status(400).json({ message: `Appointment Not Found with id ${id}` });
    }
    return res.status(200).json({ message: 'Appointment Deleted Successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const deleteAllAppointmentController = async (req: Request, res: Response) => {
  try {
    const allAppointment = await deleteAllAppointment();
    if (!allAppointment) {
      return res.status(400).json({ message: 'All Appointment Deleted Failed' });
    }
    return res.status(200).json({ message: 'All Appointment Deleted Successfully' });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};
