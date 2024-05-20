import prisma from "@/db";
import { inputChecker } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

import * as jwt from "jsonwebtoken"

export const ADMIN_JWT_SECRET = "hehe"

export async function POST(req:NextRequest){
    const {username ,email,password}:{username:string,email:string,password:string}= await req.json()
    const validUser = await inputChecker({username,email,password});
   
    

    const existingUser = await prisma.user.findFirst({
        where:{
            email:email,
        }
    });
    if(validUser&&!existingUser){
      
       
        try{
            const user = await prisma.user.create({
                data:{
                  username:username,
                  email:email,
                  password:password
                },
                select:{ 
                    email:true, 
                    password:true,
                    username:true
                }
            })
            console.log(email,password,username)
             const token = jwt.sign({email,password},ADMIN_JWT_SECRET)
            const res = NextResponse.json({msg:"account created successfully"})
            res.cookies.set({
                name:"token",
                value:token,
                maxAge: 60*60*24*7,
                httpOnly:true
            });
             console.log(token)
            // const pass = res.cookies.get("token")?.value
            // console.log(pass)
            return res;
        }catch(err){
          return NextResponse.json({err})
        }
         
    }
        return NextResponse.json({msg:"user already exixts or type issue"})
    }
