import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

import {} from "dotenv/config"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { DecodedToken } from "@/components/chat";

export async function PUT(req: NextRequest) {
    try {
        const { emailupdate, passwordupdate, usernameupdate } = await req.json();
        const tokenCookie = req.cookies.get("token")?.value;
        console.log({ emailupdate, passwordupdate, usernameupdate })
        if (!tokenCookie) {
            return NextResponse.json({ msg: "Token is missing" }, { status: 401 });
        }

        const token = jwt.verify(tokenCookie, process.env.ADMIN_JWT_SECRET!) as DecodedToken;

        const userId = token.user_id;
        let updateData = {};

        if (emailupdate) {
            updateData = { ...updateData, email: emailupdate };
        }
        if (passwordupdate) {
            const hashedPassword = await bcrypt.hash(passwordupdate, 10);
            updateData = { ...updateData, password: hashedPassword };
        }
        if (usernameupdate) {
            updateData = { ...updateData, username: usernameupdate };
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ msg: "No valid fields to update" }, { status: 400 });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                email: true,
                username: true
            }
        });

        const newToken = jwt.sign({ user_id: user.id, email: user.email, username: user.username }, process.env.ADMIN_JWT_SECRET!);
        const res = NextResponse.json({ msg: "details updated successfully" });
        
        res.cookies.set({
            name: "token",
            value: newToken,
            maxAge: 60 * 60 * 24 * 7,
        });

        return res;

    } catch (err) {
        console.error(err);
        return NextResponse.json({ msg: "An error occurred" }, { status: 500 });
    }
}
