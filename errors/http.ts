


export class BaseHttpError extends Error {
    status_code: number = 500;
    detail: object = {"detail": "Internal server error"};

    constructor(detail: object| null = null) {
        super("An error occurred")
        this.name = "http_error"
    }
}


export class UnauthenticatedHttpError extends BaseHttpError {
    status_code: number = 401;
    detail: object = {"detail": "Unauthenticated"};
}

export class BadRequestHttpError extends BaseHttpError {
    status_code: number = 400;

    constructor(detail: object) {
        super()
        this.detail = detail
    }
}