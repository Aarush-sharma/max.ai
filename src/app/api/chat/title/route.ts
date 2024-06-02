import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken"
import {}  from "dotenv/config"
import { DecodedToken } from "@/components/chat";
export async function GET(req: NextRequest) {

    const tokenCookie =  req.cookies.get("token")?.value as string;
    const token = jwt.verify(tokenCookie,process.env.ADMIN_JWT_SECRET!) as DecodedToken
    console.log(token.email)
    try {
       
        const user = await prisma.user.findFirst({
            where: {
                email: token.email,
            },
            select: {
                id: true,
            },
        });

        if (user) {
            
            const chat = await prisma.chats.findMany({
                where: {
                    user_id: user.id,
                },
                select: {
                    title: true,
                },
            });

            if (chat) {
                return NextResponse.json(chat);
            }
            return NextResponse.json("Chat title not found for the user");
        }
        return NextResponse.json("User not found");
    } catch (error) {
        return NextResponse.json(`Something went wrong`);
    }
}
