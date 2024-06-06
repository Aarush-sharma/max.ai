import { NextRequest, NextResponse } from "next/server";
import { transporter } from "../../nodemailer-config";
const map =  new Map<string,number>()

export async function GET(req:NextRequest,){
   const url = new URL(req.url)
   const email = url.searchParams.get("email") as string;
   const userOtpInput = parseInt(url.searchParams.get("otp") as string)

  try{
  
   if (!userOtpInput){
      const otp = Math.floor(Math.random() * 9000) + 1000;
      map.set("otp",otp)
      
      const mailOptions = {
         from: {
            name:"max.ai",
            address: process.env.ADMIN_EMAIL!
         },
         to: [email], 
         subject: `verification code is ${otp} `, 
         text: "verification code", 
         html: `<div><h1>${otp}</h1></div>`,
      }
    
      await transporter.sendMail(mailOptions)
   
      return NextResponse.json("otp sent");
     } else{
      const otp = map.get("otp")
      console.log(userOtpInput,otp)
       if(userOtpInput === otp){
         map.delete("otp")
         
        return NextResponse.json("verfied user")
       } else{
         map.delete("otp")
         return NextResponse.json("invalid otp")
       }
      }
  } catch(err){
   return NextResponse.json("something went wrong")
  }
} 

