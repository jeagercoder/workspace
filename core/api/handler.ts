import { BadRequestHttpError, BaseHttpError, UnauthenticatedHttpError } from "@/errors/http";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"
import { BaseService } from "../service/service";


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
    service_class: any = null

    constructor(request: NextRequest) {
        super(request)
        this.user_token = null
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

    async getServiceClass() {
        if (!this.service_class) {
            throw new Error(`.service_class not avaliable at ${this.handler_name}.`)
        }
        return this.service_class
    }

    async getService(data: object, context={}): Promise<BaseService> {
        const service = await this.getServiceClass()
        return new service(data, context)
    }

    async getContext() {
        return {
            user_token: this.user_token
        }
    }
}
