import { NextResponse,NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/api/auth')) {
       
     if(validData){
       return NextResponse.json({msg:"valid data provided"});
     }else{
        return NextResponse.json({msg:"wrong input"})
     }
    }
}

//