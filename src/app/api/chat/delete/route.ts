import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import {}  from "dotenv/config"
import * as jwt from "jsonwebtoken"
import { DecodedToken } from "@/components/chat";

export async function DELETE(req: NextRequest) {
   
        const { history, title }: { history: { role: string, parts: { text: string }[] }[], title: string } = await req.json();
        const tokenCookie =  req.cookies.get("token")?.value as string;
    const token = jwt.verify(tokenCookie,process.env.ADMIN_JWT_SECRET!) as DecodedToken
        const user = await prisma.user.findFirst({
            where: {
                email: token.email,
            },
        });

        if (user) {
            
            await prisma.messages.deleteMany({
                where: {
                    OR: history.map((message) => ({
                        role: message.role,
                        content: message.parts[0].text,
                    })),
                },
            });

            await prisma.chats.delete({
                where: {
                    title: title,
                    
                },
            });

            return NextResponse.json({ message: "Data deleted successfully" });
        } else {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    
}
