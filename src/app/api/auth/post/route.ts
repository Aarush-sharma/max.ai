import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {username ,email,password}:{username:string,email:string,password:string}= await req.json()
        try{
            const res = await prisma.user.create({
                data:{// to send the into db
                  username:username,
                  email:email,
                  password:password
                },
                select:{ // what should res contain with a return value
                    email:true, 
                    password:true,
                    username:true
                }
            })
            console.log(res)
            return NextResponse.json({res})
        }catch(err){
          return NextResponse.json({msg:"something went wrong"})
        }
        
    }
    