import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "auth.medicare@gmail.com",
    pass: "rwna mjfa qihk weke",
  },
});

export async function sendEmail(otp:number,user:string) {
    const sendmail ={
        from: {
          name:"medicare.ai",
          address:"auth.medicare@gmail.com"
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

