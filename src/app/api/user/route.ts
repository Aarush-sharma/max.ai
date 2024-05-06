import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({"nigga":"money"},{status:200})
}