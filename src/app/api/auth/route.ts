import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";



    export async function DELETE(req:NextRequest){
        const {email,password}:{email:string,password:string}= await req.json()
            try{
                const res = await prisma.user.delete({
                    where:{// to send the into db
                      id:1,
                      email:"myemail@gmail.com",
                      password:"12345678"
                    }
                })
                console.log(res)
                return NextResponse.json({msg:"user delted"})
            }catch(err){
              return NextResponse.json({msg:"something went wrong"})
            }
            
        }
