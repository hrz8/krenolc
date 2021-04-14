import express, {
  NextFunction, Request, Response
} from 'express'
import _ from 'lodash'
import { EndpointAction, MiddlewareHandler } from '../types/endpoint'
import { Context } from '../types/action'
import log from '../utils/logger'
import defaultApiHandler from './handlers'
import { SuccessResponse, Response as UtilsResponse } from '../utils/response'

const runMiddlewares = async (
  middlewares: MiddlewareHandler[],
  ctx: Context
): Promise<void> => {
  let nextHandler: NextFunction = _.noop
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

const apiHandler = async (req: Request, res: Response): Promise<void | undefined> => {
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
          version.substring(1),
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

export default (path = '/api'): express.Router => {
  const apiRouter = express.Router()
  apiRouter.use(`${path}/health-check`, (req: Request, res: Response) => res.status(200)
    .send({
      data: 'ok'
    }))
  apiRouter.use(`${path}/:version/:endpointId`, ...defaultApiHandler, apiHandler)
  apiRouter.use(`${path}/:endpointId`, ...defaultApiHandler, apiHandler)
  return apiRouter
}
