import "dotenv/config";
import nodemailer from "nodemailer";
import { IEmail } from "../interface/services";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 25,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = (data: IEmail): Promise<string> => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(data, (error: any, info: any) => {
        if (error) {
          console.error("Error sending email: ", error);
          reject(error);
        } else {
          console.log("Email sent: ", info.response);
          resolve(info.response);
        }
      });
    });
  };

export { sendEmail };