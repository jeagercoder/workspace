import { BadRequestHttpError, BaseHttpError, UnauthenticatedHttpError } from "@/errors/http";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"
import { BaseService } from "./service/service";


const secret = process.env.SECRET

class BaseApiHandler {
    handler_name: string
    request: NextRequest
    request_method: string
    constructor(request: NextRequest) {
        this.handler_name = this.constructor.name
        this.request = request
        this.request_method = request.method.toLowerCase()
    }

    async get(request: NextRequest): Promise<NextResponse> {
        throw new Error("GET() must be implemented.")
    }

    async post(request: NextRequest): Promise<NextResponse> {
        throw new Error("POST() must be implemeted.")
    }

    async put(request: NextRequest): Promise<NextResponse> {
        throw new Error("PUT() must be implemeted.")
    }

    async delete(request: NextRequest): Promise<NextResponse> {
        throw new Error("PUT() must be implemeted.")
    }

    async handler() {
        return this[this.request_method](this.request)
    }
}


export class ApiHanlder extends BaseApiHandler {
    user_token: object | null
    post_service: any
    put_service: any

    constructor(request: NextRequest) {
        super(request)
        this.user_token = null
        this.post_service = null
        this.put_service = null
    }

    async handler() {
        try {
            const req = this.request
            const token = await getToken({ req, secret })
            this.user_token = token
            const response = await super.handler()
            return response
        } catch(err) {
            if (err instanceof BaseHttpError) {
                return NextResponse.json(err.detail, {status: err.status_code})
            }
            throw err
        }
    }

    async getService({data}: {data: any | null}): Promise<BaseService> {
        const service_name = `${this.request_method}_service`
        const service = this[service_name]
        if (!service) {
            throw new Error(`${service_name} not available at ${this.handler_name}.`)
        }
        return new service({data})
    }
}
