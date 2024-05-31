import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    

    const data = new URL(req.url)
    const email =  data.searchParams.get("email") as string;

    try {
        // Find user by email
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
            select: {
                id: true,
            },
        });

        if (user) {
            // Find chat title by user ID
            const chat = await prisma.chats.findFirst({
                where: {
                    user_id: user.id,
                },
                select: {
                    title: true,
                },
            });

            if (chat?.title) {
                // Return array of titles
                return NextResponse.json([chat.title]);
            }

            // Chat title not found
            return NextResponse.json("Chat title not found for the user");
        }

        // User not found
        return NextResponse.json("User not found");
    } catch (error) {
        // Handle any unexpected errors
        return NextResponse.json(`Something went wrong`);
    }
}
