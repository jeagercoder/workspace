import { NextRequest, NextResponse } from "next/server";
import { Middleware } from "./types/middleware";

export type {Middleware} from '@/types/middleware'

function authMiddleware(request: NextRequest, response: NextResponse): NextResponse {
    console.log('auth', request.nextUrl.pathname)
    return response
}


const middlewareRegistered: Middleware[] = [
    authMiddleware,
]


export function middleware(request: NextRequest): NextResponse {
    let response = NextResponse.next()
     for (const mid of middlewareRegistered) {
        response = mid(request, response)
     }
    return response
}

export const config = {
    matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
  }