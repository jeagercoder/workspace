import { request } from "http";
import { NextRequest } from "next/server";





export async function HandlerWrapper(request: any, handlerClass: any) {
    const hanlder = new handlerClass(request)
    return await hanlder.handler()
}