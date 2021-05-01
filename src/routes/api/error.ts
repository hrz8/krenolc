import { Response } from 'express'
import _isError from 'lodash/isError'
import _toNumber from 'lodash/toNumber'

import { ErrorCode, ErrorResponse } from '@/utils/responses/error'

export class ApiError extends ErrorCode {
  static versionNotValid(data: any, message: string): ErrorResponse {
    return new ErrorResponse(
      data,
      400,
      message,
      `${this.brain}-KRENOLC_${this.codedName}-001`
    )
  }

  static endpointNotFound(_data: any, message: string): ErrorResponse {
    const { version, ...data } = _data
    return new ErrorResponse(
      data,
      404,
      message,
      `${this.brain}-KRENOLC_${this.codedName}-002`,
      version
    )
  }

  static parameterNotValid(data: any, message: string): ErrorResponse {
    const { version, params } = data
    return new ErrorResponse(
      params,
      400,
      message,
      `${this.brain}-KRENOLC_${this.codedName}-003`,
      version
    )
  }
}

export const apiErrorDefault = (res: Response, version: string, err: any): void => {
  const isErrorObj = _isError(err)
  const errorData = process.env.NODE_ENV === 'dev' ? {
    message: err?.message || 'Server Error'
  } : {
    message: 'Server Error'
  }
  const errorResponse = isErrorObj ? new ErrorResponse(
    errorData,
    500,
    'Relax! It\'s not your fault. We\'re sorry about this, but something wrong happen with our server 😢',
    `${(process.env.BRAIN || 'KRY')}-KRENOLC_API_ERROR-500`,
    version
  ) : {
    ...err,
    apiVersion: version
  } as ErrorResponse
  res
    .status(_toNumber(err.status || '500'))
    .send(errorResponse)
}
