import _isObjectLike from 'lodash/isObjectLike'

interface SuccessPayload {
    responseMessage?: string;
    apiVersion?: string;
}

export class Response {
    public data: any

    public meta: any

    public constructor(data: any, meta = {}) {
        this.data = _isObjectLike(data) ? data : {}
        this.meta = meta
    }
}

export class SuccessResponse {
    public status: string

    public apiVersion: string

    public data: Record<string, any>

    public message: string

    public meta: any

    public constructor(
        data: Record<string, any>,
        meta = {},
        {
            responseMessage = '',
            apiVersion
        }: SuccessPayload = {} as SuccessPayload
    ) {
        if (!_isObjectLike(data)) {
            throw new Error('data must be in array or object')
        }

        this.status = '200'
        this.apiVersion = apiVersion || 'unknown'
        this.data = _isObjectLike(data) ? data : {}
        this.meta = meta
        this.message = responseMessage
    }
}
