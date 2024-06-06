import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../nodemailer-config";
const map =  new Map<string,number>()

export async function GET(req:NextRequest,){
    const url = new URL(req.url)
    const email = url.searchParams.get("email") as string;
    const userOtpInput = parseInt(url.searchParams.get("otp") as string)
   
   if (!userOtpInput){
    const otp = Math.floor(Math.random() * 9000) + 1000;
    map.set("otp",otp)
    sendEmail(otp,email)
    return NextResponse.json("otp sent");
   } else{
    const otp = map.get("otp")
     if(userOtpInput === otp){
        map.delete("otp")
      return NextResponse.json("verfied user")
     } else{
        map.delete("otp")
        return NextResponse.json("invalid otp")
     }
    }
} 

