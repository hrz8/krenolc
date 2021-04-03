import express, {
  NextFunction, Request, Response
} from 'express'
import BotFactory from '../bot/factory'
import { EndpointAction, MiddlewareHandler } from '../types/endpoint'
import { Context, HTTPMethod } from '../types/action'

import log from '../utils/logger'
import { SuccessResponse, Response as UtilsResponse } from '../utils/response'

const buildContext = (req: Request, action: EndpointAction): Context => {
  const {
    params, query, body, method, baseUrl, headers, ...rest
  } = req
  return {
    params: {
      params,
      query,
      body,
      headers
    },
    baseUrl,
    action,
    method: method as HTTPMethod,
    event : rest as Request
  }
}

const runMiddlewares = async (
  middlewares: MiddlewareHandler[],
  ctx: Context
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let nextHandler: NextFunction = (): void => {}
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

const apiHandler = async (req: Request, res: Response) => {
  const { endpointId } = req.params
  const { endpoint } = BotFactory.getDefaultBot()

  // get action object from endpoint
  const action = endpoint.get(endpointId)
  if (!action) {
    log.error(`endpointId not found:${endpointId}`)
    res.status(404)
      .send({
        data: `/api/${endpointId} not found`
      })
    return
  }

  // get properties of oaction object
  const {
    before, after, method, handler
  } = action
  if (method && req.method !== method) {
    log.error(`endpointId not found:${endpointId}`)
    res.status(404)
      .send({
        data: `${method} /api/${endpointId} not found`
      })
    return
  }

  // preapring handler and context params
  const ctx: Context = buildContext(req, action)
  const handlerBounded = handler.bind(null, ctx)
  try {
    // run before middleware
    await runMiddlewares(before || [], ctx)

    // run handler
    const { data, meta } = await handlerBounded() as UtilsResponse
    res
      .status(200)
      .send(
        new SuccessResponse(
          data,
          meta,
          endpointId
        )
      )

    // run after middlewares
    await runMiddlewares(after || [], ctx)
  } catch (err) {
    res
      .status(500)
      .send(err)
  }
}

const apiRouter = express.Router()
apiRouter.use('/api/health-check', (req: Request, res: Response) => res.status(200)
  .send({
    data: 'ok'
  }))
apiRouter.use('/api/:endpointId', apiHandler)

export default apiRouter
