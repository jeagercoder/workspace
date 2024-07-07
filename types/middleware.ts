import { NextRequest, NextResponse } from "next/server";



export interface Middleware {
    (request: NextRequest, response: NextResponse): NextResponse
}

