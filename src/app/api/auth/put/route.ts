import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { inputChecker } from "@/lib/types";

export async function PUT(req:NextRequest){
    const {email,updatedPassword}:{email:string,updatedPassword:string}= await req.json()
    const validData = await inputChecker({email,updatedPassword});
        if(validData){
            try{
                const res = await prisma.user.update({
                    where:{
                      email:email,
                    },data:{
                        password:updatedPassword
                    },
                    select:{ 
                        email:true, 
                        password:true,
                        username:true
                    }
                })
                console.log(res)
                return NextResponse.json({res})
            }catch(err){
              return NextResponse.json({msg:"user not found"})
            }
        }
        return NextResponse.json({msg:"invalid input"})
    }