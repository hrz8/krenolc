import express, { Request, Response } from 'express'
import _toNumber from 'lodash/toNumber'

import { ErrorResponse } from '@/utils/responses/error'
import EnvFactory from '@/utils/env'
import { BRAIN_DEFAULT } from '@/libs/constant'

const errorHandler = (
  req: Request,
  res: Response
): void | undefined => {
  const { baseUrl } = req
  const brain = EnvFactory.get<string>('BRAIN', BRAIN_DEFAULT)
  const err = new ErrorResponse(
    {
      method: req.method,
      url   : baseUrl
    },
    404,
    'The requested URL was not found on our server 💀',
    `${brain}-KRENOLC_SERVER_ERROR-404`
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
