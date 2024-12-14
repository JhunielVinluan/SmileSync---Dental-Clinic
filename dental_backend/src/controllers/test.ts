import { Request, Response } from "express";
import { testFunc } from "../services/test";


export const testController = async (req: Request, res: Response) => {
  try {
    const greet = await testFunc();
    if (!greet) {
      res.status(400).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Hello TypesCript Test Here" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};
