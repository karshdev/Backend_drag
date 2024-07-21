import nodemailer from "nodemailer";
import dotenv from "dotenv";
import type Mail from "nodemailer/lib/mailer";
import createHttpError from "http-errors";

dotenv.config();
interface Data{
  name: string,
  email: string
  phone: string
  message:string

}
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async (data: Data, imageUrl: string): Promise<any> => {
  const mailOptions: Mail.Options = {
    from: process.env.MAIL_USER, 
    to: data.email, 
    subject: "Image Email", 
    html: `
   
      <p> ${data.name} has requested Quotes</p>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        <li><strong>Message:</strong> ${data.message}</li>
      </ul>
      <p>Here is the requested Image:</p>
      <br>
      <img src="${imageUrl}" alt="Requested Image" style="max-width: 100%; height: auto;">
  `,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw createHttpError(500, { message: error.message });
  }
};
