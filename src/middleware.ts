import { NextApiResponse } from 'next'
import { redirect } from 'next/dist/server/api-utils'
import { NextResponse,NextRequest } from 'next/server'


export async function middleware(req: NextRequest,res:NextApiResponse) {
    if (req.nextUrl.pathname.startsWith('/api/auth')) {
       if(req.method === "GET"){
        console.log("yeah this is get")
        return NextResponse.next()
       }
       return NextResponse.next()
    }else if(req.nextUrl.pathname.startsWith('/ask')){
        const token = req.cookies.get("token")?.value as string
        const out = NextResponse.json({msg:"account created successfully"})
        if(token){
            return NextResponse.next()
        } else{
           redirect(res,200,"/")
        }
        return out;
    }
    return NextResponse.next()
} 
