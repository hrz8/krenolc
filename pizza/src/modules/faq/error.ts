import { ErrorCode, ErrorResponse } from '@/utils/responses/error'

export default class FaqModuleError extends ErrorCode {
    static TryError(data: any, message: string): ErrorResponse {
        return new ErrorResponse(
            {
                name: `${this.name}_${FaqModuleError.TryErrorWithReponseMsg.name}`,
                ...data
            },
            400,
            message,
            `${this.prefix}-001`
        )
    }

    static TryErrorWithReponseMsg(data: any, message: string): ErrorResponse {
        return new ErrorResponse(
            {
                name: `${this.name}_${FaqModuleError.TryErrorWithReponseMsg.name}`,
                ...data
            },
            400,
            message,
            `${this.prefix}-002`,
            {
                reponseMessage: 'replaced!'
            }
        )
    }
}
