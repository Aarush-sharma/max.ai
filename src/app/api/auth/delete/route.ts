import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { inputChecker } from "@/lib/types";

export async function DELETE(req:NextRequest){
        const {email,password,username}:{email:string,password:string,username:string}= await req.json()
        const validData = await inputChecker({username,password,email});
        if (validData){
            try{
                const res = await prisma.user.delete({
                    where:{
                        username:username,
                      email:email,
                      password:password
                    }
                })
                console.log(res)
                return NextResponse.json({msg:"user delted"})
            }catch(err){
              return NextResponse.json({msg:"user not found"})
            }
        }
            return NextResponse.json({msg:"invalid credentials"})
        }
        