
import { cache } from 'react'
import {z} from 'zod'


export class BaseService {

    nonSafeData: object
    validatedData: object = {}
    __data: object | null = null
    __errors: object | null = null
    __has_validate: boolean = false
    __context: object = {}

    constructor(data: object, context: object = {}) {
        this.nonSafeData = data
        this.__context = context
    }

    get context() {
        return this.__context
    }

    get data() {
        if (!this.__has_validate) {
            throw new Error("Can't read .data before call .isValid()")
        }
        return this.__data
    }

    get error() {
        return this.__errors
    }

    async isValid() {
        const valid = await this.__validate({data: this.nonSafeData})
        this.__has_validate = true
        return valid
    }

    async __validate({data}: {data: object}) {
        let zodObject = z.object({})
        for (let [key, value] of Object.entries(this)) {
            if (value instanceof z.ZodType) {
                zodObject = zodObject.extend({[key]: value})
            }
        }
        const validData = await zodObject.safeParseAsync(data)
        if (!validData.success) {
            this.__errors = validData.error
            return false
        }
        const validCustomData = await this.validate(data=validData.data)
        this.validatedData = validCustomData
        return true
    }

    async validate(data: any) {
        return data
    }

    async create() {
        const result = await this.processCreate(this.validatedData)
        this.__data = result
        console.log(this.__data)
    }

    async processCreate(_validatedData: object): Promise<object> {
        throw new Error("when .create() is called .processCreate() must be implemented.")
    }
}