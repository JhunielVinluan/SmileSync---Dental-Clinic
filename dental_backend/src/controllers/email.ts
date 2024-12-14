import { Request, Response } from "express";
import { sendEmail } from "../services/email";
import { IEmail } from "../interface/services";

export const SendEmailController = async (req: Request, res: Response) => {
  try {
    const { email, subject, description } = req.body;
    if (!email || !subject || !description)
      return res.status(400).json({ message: "Fill All Fields" });
    const data: IEmail = {
      from: process.env.EMAIL,
      to: email,
      subject,
      text: `Congratulations your Token is, ${description} from dental psu.`,
    };
    const status = await sendEmail(data);
    if (!status) {
      res.status(400).json({ message: "Failed to send email" });
    }
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};