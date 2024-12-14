import {
  createSurgical,
  deleteOneSurgical,
  getOneSurgical,
  getSurgical,
  updateOneSurgical,
} from "@/services/surgical";
import { Request, Response } from "express";

export const getSurgicalController = async (req: Request, res: Response) => {
  try {
    const surgical = await getSurgical();
    res.status(200).json(surgical);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const getOneSurgicalController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const oneSurgical = await getOneSurgical({ id });
    if (!oneSurgical) {
      res.status(400).json({ message: `Surgical Not Found with id ${id}` });
    }
    return res.status(200).json(oneSurgical);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const createSurgicalController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { name, description, status } = data;
    if (!name || !description || !status) {
      res.status(400).json({ message: "All fields are required" });
    }
    const surgical = await createSurgical(data);
    res.status(200).json(surgical);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const updateSurgicalController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Surgical Id is required" });
    }
    const { name, description, status } = data;
    if (!name || !description || !status) {
      res.status(400).json({ message: "All fields are required" });
    }
    const updateData = { ...data, id };
    const surgical = await updateOneSurgical(updateData);
    res.status(200).json(surgical);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

export const deleteOneSurgicalController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const oneSurgical = await deleteOneSurgical({ id });
    if (!oneSurgical) {
      res.status(400).json({ message: `Surgical Not Found with id ${id}` });
    }
    return res.status(200).json({ message: "Surgical Deleted Successfully" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};
