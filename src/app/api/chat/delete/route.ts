import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
   
        const { history, title }: { history: { role: string, parts: { text: string }[] }[], title: string } = await req.json();
        const email = req.cookies.get("email")?.value as string;
       console.log(history,title)
        const user = await prisma.user.findFirst({
            where: {
                email: email,
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
