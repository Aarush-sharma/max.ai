import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { inputChecker } from "@/lib/types"; 
import * as jwt from "jsonwebtoken"
import {} from "dotenv/config"
import * as bcrypt from "bcrypt"
export async function GET(req:NextRequest){

  const data = new URL(req.url)
  const email =  data.searchParams.get("email") as string;
  const password = data.searchParams.get("password") as string;
    
  const validData = await inputChecker({email:email}); 

  if(validData){
    try{
      const user = await prisma.user.findFirst({
        where: {
          email:email
        },select:{
            email:true,
            username:true,
            password:true,
            id:true
        }
      });
      if(user){
       const IsVerifiedPassword = await bcrypt.compare(password,user.password)
     
      if(IsVerifiedPassword){
        const res = NextResponse.json({msg:"loged in succesfully"})
      const newtoken = jwt.sign({user_id :user.id,email:email,username:user.username},process.env.ADMIN_JWT_SECRET!)
      res.cookies.set({
        name:"token",
        value:newtoken,
        maxAge: 60*60*24*7,
      })
      return res;
      } else{
        return NextResponse.json("password does not match")
      }
      } else{
        return NextResponse.json({msg:"user not found"})
      }
    }catch(Err){
    return NextResponse.json({msg:"incorrect pass or user not found"});
    }
  }else{ 
  return NextResponse.json({msg:"invalid input type"})
  }
}
