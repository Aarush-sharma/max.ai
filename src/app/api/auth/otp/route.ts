import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../nodemailer-config";

export async function GET(req:NextRequest,){
    const url = new URL(req.url)
    const email = url.searchParams.get("email") as string;

    let otp = Math.floor(Math.random() * 9000) + 1000;
    sendEmail(otp,email)

    const res =NextResponse.json({msg:"verfied user"})
    res.cookies.set("email",email)

    const a = otp.toString();
    res.cookies.set("otp",a);

    return res;
} 