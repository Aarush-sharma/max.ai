const nodemailer = require("nodemailer");
require("dotenv").config()

const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "aarushmrt@gmail.com",
    pass: "hzqi oeac vggr dyhc",
  },
});

var otp = Math.floor(Math.random() * 9000) + 1000
  

async function main() {
    const sendmail ={
        from: {
          name:"medicare",
          address:"aarushmrt@gmail.com"
        }, // sender address
        to: ["auth.medicare@gmail.com"], 
        subject: `verification code is 4568 `, 
        text: "verification code", 
        html: `<div><h1>4568</h1></div>`,
      }
 try{
 await transporter.sendMail(sendmail)
 console.log("email sent")
 }catch(error){
  console.error(error)
 }
}

export {main , otp}