import { ErrorCode, ErrorResponse } from '~/src/utils/responses/error'

export default class ApiRouteError extends ErrorCode {
  static versionNotValid(data: any, message: string): ErrorResponse {
    return new ErrorResponse(
      data,
      400,
      message,
      `${this.prefix}-001`
    )
  }

  static endpointNotFound(data: any, message: string): ErrorResponse {
    return new ErrorResponse(
      data,
      404,
      message,
      `${this.prefix}-002`
    )
  }

  static parameterNotValid(data: any, message: string): ErrorResponse {
    return new ErrorResponse(
      data,
      400,
      message,
      `${this.prefix}-003`
    )
  }
}
