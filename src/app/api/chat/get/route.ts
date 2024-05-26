import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const email = url.searchParams.get("email") as string;
    const title = url.searchParams.get("title") as string;
  
    const user = await prisma.user.findFirst({
        where: {
          email: email,
          
        },select:{
            id:true
        }
    });
    if(user !== null){
try{
    const res = await prisma.chats.findFirst({
        where: {
          // Assuming 'title' is a unique field in the 'chats' model
          title: title,
          user_id:user.id
        },
        include: {
          messages: true,
        },
      });
    
      return NextResponse.json(res?.messages)
} catch(err){
    return NextResponse.json("chat dont exist",{status:404})
}
    }else{
        return NextResponse.json("user not found",{status:404})
    }
  }