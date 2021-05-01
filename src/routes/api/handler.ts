import {
  NextFunction, Request, Response
} from 'express'
import _noop from 'lodash/noop'

import { SuccessResponse, Response as UtilsResponse } from '@/utils/responses/success'
import log from '@/utils/logger'

import { Context } from '@/types/action'
import { EndpointAction, MiddlewareHandler } from '@/types/endpoint'

const runMiddlewares = async (
  middlewares: MiddlewareHandler[],
  ctx: Context
): Promise<void> => {
  let nextHandler: NextFunction = _noop
  for (let i = middlewares.length - 1; i >= 0; i--) {
    const handler = middlewares[i]
    const currHandler = handler.bind(
      null, ctx, nextHandler
    )
    nextHandler = currHandler
  }
  const firstHandler: NextFunction = nextHandler
  await firstHandler()
}

export default async (req: Request, res: Response): Promise<void | undefined> => {
  const {
    action, version, endpointId, ctx
  } = res.locals as {
    action: EndpointAction,
    version: string,
    endpointId: string,
    ctx: Context
  }
  const {
    method, handler, before, after
  } = action

  // prep handler function
  const handlerBounded = handler.bind(null, ctx)
  try {
    // run before middleware
    await runMiddlewares(before || [], ctx)

    // run endpoint handler
    const { data, meta } = await handlerBounded() as UtilsResponse
    res
      .status(200)
      .send(
        new SuccessResponse(
          data,
          meta,
          version,
          endpointId
        )
      )

    // run after middlewares
    await runMiddlewares(after || [], ctx)
  } catch (err) {
    log.error(`error while running action: ${method}-${version}-${endpointId}`)
    log.error(err)
    res
      .status(500)
      .send(err)
  }
}
