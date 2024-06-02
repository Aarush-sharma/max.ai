import prisma from "@/db";
import { inputChecker } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import {} from "dotenv/config"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

export async function POST(req:NextRequest){
    const {username ,email,password}:{username:string,email:string,password:string}= await req.json()
    const validUser = await inputChecker({username,email,password});

    const existingUser = await prisma.user.findFirst({
        where:{
            email:email,
        }
    });
    if(validUser && !existingUser){
        const hashedPassword = await bcrypt.hash(password,10)
        try{
            const user = await prisma.user.create({
                data:{
                  username:username,
                  email:email,
                  password:hashedPassword
                },
                select:{ 
                    email:true, 
                    id:true,
                    username:true
                }
            })

            const token = jwt.sign({user_id :user.id,email:email,username:username},process.env.ADMIN_JWT_SECRET!)
            const res = NextResponse.json({msg:"account created successfully"})
            res.cookies.set({
                name:"token",
                value:token,
                maxAge: 60*60*24*7,
            });
             console.log(token)
            return res;

        }catch(err){
          return NextResponse.json({err})
        }
    }
        return NextResponse.json({msg:"user already exixts"})
    }
