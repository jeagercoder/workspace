
import {z} from 'zod'


export class BaseService {

    nonSafeData: object
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
        if (this.__data === null) {
            throw new Error("Can't read .data if data is not valid, please check error with .errors")
        }
        return this.__data
    }

    get error() {
        return this.__errors
    }

    async isValid() {
        const valid = await this.validate({data: this.nonSafeData})
        this.__has_validate = true
        return valid
    }

    async validate({data}: {data: object}) {
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
        this.__data = validData.data
        return true
    }
}