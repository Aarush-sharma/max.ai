import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { inputChecker } from "@/types";

export async function GET(req:NextRequest){
    const {username ,email,password}:{username:string,email:string,password:string}= await req.json()

    const validData = await inputChecker({username,password,email});
    if(validData){
        try{
            const user = await prisma.user.findFirst({
                where: {
                  email
                },select:{
                    email:true,
                    username:true
                }
              });
               console.log(user);
               return NextResponse.json({user})
        }catch (err){
            return NextResponse.json({msg:"user not found"})
        }
    }else{
        return NextResponse.json({msg:"invalid credentials"})
    }
}