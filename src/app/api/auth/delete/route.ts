import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { DecodedToken } from "@/components/chat";

export async function DELETE(req: NextRequest) {
    try {
        const tokenCookie = req.cookies.get("token")?.value;

        if (!tokenCookie) {
            return NextResponse.json({ msg: "Token is missing" }, { status: 401 });
        }

        const token = jwt.verify(tokenCookie, process.env.ADMIN_JWT_SECRET!) as DecodedToken;

        const chats = await prisma.chats.findMany({
            where: {
                user_id: token.user_id
            },
            select: {
                id: true
            }
        });

        if (chats.length > 0) {
            const chatIds = chats.map(chat => chat.id);

            await prisma.messages.deleteMany({
                where: {
                    chat_id: {
                        in: chatIds
                    }
                }
            });

            await prisma.chats.deleteMany({
                where: {
                    user_id: token.user_id
                }
            });

            await prisma.user.delete({
                where: {
                    id: token.user_id
                }
            });
        } else {
            return NextResponse.json({ msg: "Chats not found" }, { status: 404 });
        }

        const res = NextResponse.json({ msg: "Account deleted successfully" });
        
        res.cookies.delete("token");

        return res;

    } catch (err) {
        console.error(err);
        return NextResponse.json({ msg: "An error occurred" }, { status: 500 });
    }
}
