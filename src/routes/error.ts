import express, { Request, Response } from 'express'
import _toNumber from 'lodash/toNumber'

import { ErrorCode, ErrorResponse } from '@/utils/responses/error'

class ErrorRoute extends ErrorCode {
  static routeNotFound(data: any, message: string): ErrorResponse {
    return new ErrorResponse(
      data,
      404,
      message,
      `${this.prefix}-001`
    )
  }
}

const errorHandler = (
  req: Request,
  res: Response
): void | undefined => {
  const { baseUrl } = req
  const err = ErrorRoute.routeNotFound({
    baseUrl
  }, '404 Not Found')
  res
    .status(_toNumber(err.status))
    .send(err)
}

export default (): express.Router => {
  const errorRouter = express.Router()
  errorRouter.use('*', errorHandler)
  return errorRouter
}
