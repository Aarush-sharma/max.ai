import nodemailer from "nodemailer"
import {} from "dotenv/config"
const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSKEY,
  },
});

export async function sendEmail(otp:number,user:string) {
    const sendmail ={
        from: {
          name:"medicare.ai",
          address: process.env.ADMIN_EMAIL!
        },
        to: [user], 
        subject: `verification code is ${otp} `, 
        text: "verification code", 
        html: `<div><h1>${otp}</h1></div>`,
      }
 try{
 await transporter.sendMail(sendmail)
 return true;
 }catch(error){
  return false
 }
}

