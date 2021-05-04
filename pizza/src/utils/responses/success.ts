import _isObjectLike from 'lodash/isObjectLike'
import _camelCase from 'lodash/camelCase'

type SuccessPayload = {
    responseMessage?: string
    apiVersion: string,
    module: string,
    endpoint: string
}

export class Response {
    public data: any

    public meta: any

    constructor(data: any, meta = {}) {
        this.data = _isObjectLike(data) ? data : {}
        this.meta = meta
    }
}

export class SuccessResponse {
    public status: string

    public apiVersion: string

    public data: any

    public message: string

    public meta: any

    constructor(
        data: any,
        meta = {},
        {
            responseMessage = '',
            apiVersion,
            module,
            endpoint
        }: SuccessPayload = {} as SuccessPayload
    ) {
        if (!_isObjectLike(data)) {
            throw new Error('data must be in array or object')
        }

        this.status = '200'
        this.apiVersion = apiVersion
        this.data = _isObjectLike(data) ? data : {}
        this.meta = meta
        this.message = responseMessage || `success ${module} ${_camelCase(endpoint)}`
    }
}
