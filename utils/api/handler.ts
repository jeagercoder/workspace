import { BadRequestHttpError, BaseHttpError, UnauthenticatedHttpError } from "@/errors/http";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"
import { ZodObject } from "zod"


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
    post_validator: ZodObject<any> | null
    put_validator: ZodObject<any> | null

    constructor(request: NextRequest) {
        super(request)
        this.user_token = null
        this.post_validator = null
        this.put_validator = null
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

    async getValidator(): Promise<ZodObject<any>> {
        const validator_name = `${this.request_method}_validator`
        const validator = this[validator_name]
        if (!validator) {
            throw new Error(`${validator_name} not available at ${this.handler_name}.`)
        }
        return validator
    }

    async post(request: NextRequest) {
        const dataPost = await request.json()
        const validator = await this.getValidator()
        const dataValid = await validator.safeParseAsync(dataPost)
        if (!dataValid.success) {
            throw new BadRequestHttpError(dataValid.error)
        }
        return NextResponse.json(dataValid.data, {status: 201})
    }
}
