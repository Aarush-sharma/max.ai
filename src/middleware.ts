

import { NextResponse,NextRequest } from 'next/server'


export async function middleware(req: NextRequest) {
    if(req.nextUrl.pathname.startsWith('/ask')){
        const token = req.cookies.get("token")?.value as string
        if(token){
           return NextResponse.next()
        } else{
            return NextResponse.redirect(new URL('/sign-up', req.url))
        }
    } else if(req.nextUrl.pathname.startsWith('/account')){
        const token = req.cookies.get("token")?.value as string
        if(token){
           return NextResponse.next()
        } else{
            return NextResponse.redirect(new URL('/sign-up', req.url))
        }
    }
    return NextResponse.next()
} 
