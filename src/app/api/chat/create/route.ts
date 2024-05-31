import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {
  
  const { history, title }: { history: { role: string, parts: { text: string }[] }[], title: string } = await req.json();
  const email = req.cookies.get("email")?.value as string;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      const newChat = await prisma.chats.create({
        data: {
          title: title,
          user: {
            connect: {
              id: user.id,
            },
          },
          messages: {
            create: history.map((message) => ({
              role: message.role,
              content: message.parts[0].text,
            })),
          },
        },
      });
  
      return NextResponse.json({ message: "Data inserted successfully" });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}