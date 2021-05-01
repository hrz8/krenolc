import { ErrorCode, ErrorResponse } from '@/utils/responses/error'

export default class FaqModuleError extends ErrorCode {
  static tryError(data: any, message: string): ErrorResponse {
    return new ErrorResponse(
      data,
      400,
      message,
      `${this.prefix}-001`
    )
  }
}
