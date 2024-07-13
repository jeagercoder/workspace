import { NextRequest, NextResponse } from "next/server";
import { Middleware } from "./types/middleware";
import { getToken } from "next-auth/jwt";

export type { Middleware } from '@/types/middleware'

import { BaseHttpError, UnauthenticatedHttpError } from "./errors/http";


const secret = process.env.SECRET

async function authMiddleware(req: NextRequest, res: NextResponse) {
    const token = await getToken({ req, secret })
    if (!token) {
        throw new UnauthenticatedHttpError()
    }
    return { req, res }
}


const middlewareRegistered: Middleware[] = [
    authMiddleware,
]


export async function middleware(req: NextRequest): Promise<NextResponse> {
    let res = NextResponse.next()
    for (const mid of middlewareRegistered) {
        try {
            ({ req, res } = await mid(req, res))
        } catch (err) {
            if (err instanceof BaseHttpError) {
                return NextResponse.json(err.detail, { status: err.status_code })
            }
            throw err
        }
    }
    return res
}

export const config = {
    matcher: ['/api/project/:path*'],
}