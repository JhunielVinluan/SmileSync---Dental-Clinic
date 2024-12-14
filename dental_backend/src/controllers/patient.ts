import {
  getPatient,
  getOnePatient,
  deleteOnePatient,
  createPatient,
  updateOnePatient,
} from "@/services/patient";
import { Request, Response } from "express";

export const getPatientController = async (req: Request, res: Response) => {
  try {
    const patient = await getPatient();
    res.status(200).json(patient);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getOnePatientController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const onePatient = await getOnePatient({ id });
    if (!onePatient) {
      res.status(400).json({ message: `Patient Not Found with id ${id}` });
    }
    return res.status(200).json(onePatient);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const createPatientController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const {
      firstName,
      middleName,
      lastName,
      age,
      gender,
      contactNumber,
      address,
      civilStatus,
      birthdate,
      email
    } = data;
    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !age ||
      !gender ||
      !contactNumber ||
      !address ||
      !civilStatus ||
      !birthdate ||
      !email
    ) {
      res.status(400).json({ message: "All fields are required" });
    }
    const patient = await createPatient(data);
    res.status(200).json(patient);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const updatePatientController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Patient Id is required" });
    }
    const {
      firstName,
      middleName,
      lastName,
      age,
      gender,
      contactNumber,
      address,
      civilStatus,
      birthdate,
      email
    } = data;
    if (
      !firstName ||
      !middleName ||
      !lastName ||
      !age ||
      !gender ||
      !contactNumber ||
      !address ||
      !civilStatus ||
      !birthdate ||
      !email
    ) {
      console.log({ body: req.body });
      res.status(400).json({ message: "All fields are required" });
    }
    const updateData = { ...data, id };
    const patient = await updateOnePatient(updateData);
    res.status(200).json(patient);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const deleteOnePatientController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const onePatient = await deleteOnePatient({ id });
    if (!onePatient) {
      res.status(400).json({ message: `Patient Not Found with id ${id}` });
    }
    return res.status(200).json({ message: "Patient Deleted Successfully" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};
