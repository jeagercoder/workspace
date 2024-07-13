import { NextRequest, NextResponse } from "next/server";



export interface Middleware {
    (req: NextRequest, res: NextResponse): Promise<{req: NextRequest, res: NextResponse}>
}

