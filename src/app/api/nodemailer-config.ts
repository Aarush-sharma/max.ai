import nodemailer from "nodemailer"
import {} from "dotenv/config"
export const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSKEY,
  },
});



