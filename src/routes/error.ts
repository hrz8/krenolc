import express, { Request, Response } from 'express'
import _toNumber from 'lodash/toNumber'

import { ErrorResponse } from '@/utils/responses/error'

const errorHandler = (
  req: Request,
  res: Response
): void | undefined => {
  const { baseUrl } = req
  const err = new ErrorResponse(
    {
      url: baseUrl
    },
    404,
    'The requested URL was not found on our server 💀',
    `${(process.env.BRAIN || 'KRY')}-KRENOLC_SERVER_ERROR-404`
  )
  res
    .status(_toNumber(err.status))
    .send(err)
}

export default (): express.Router => {
  const errorRouter = express.Router()
  errorRouter.use('*', errorHandler)
  return errorRouter
}
