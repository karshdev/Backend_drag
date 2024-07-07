import nodemailer from "nodemailer";
import dotenv from "dotenv";
import type Mail from "nodemailer/lib/mailer";
import createHttpError from "http-errors";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async (email: string, imageUrl: string): Promise<any> => {
  const mailOptions: Mail.Options = {
    from: process.env.MAIL_USER, 
    to: email, 
    subject: "Image Email", 
    html: `
    <p>Here is the image you requested:</p>
    <br>
    <img src="${imageUrl}" alt="Image">
  `,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw createHttpError(500, { message: error.message });
  }
};
