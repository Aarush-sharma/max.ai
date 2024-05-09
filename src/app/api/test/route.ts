import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient()
export async function POST(req:NextRequest){
    const {email,password}:{email:string,password:string}= await req.json()
        try{
            const res = await prisma.user.create({
                data:{// to send the into db
                    
                  email:email,
                  password:password
                },
                select:{ // what should res contain with a return value
                    email:true, 
                    password:true
                }
            })
            console.log(res)
            return NextResponse.json({msg:"user created"})
        }catch(err){
          return NextResponse.json({msg:"something went wrong"})
        }
        
    }