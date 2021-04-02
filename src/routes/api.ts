import express, {
  NextFunction, Request, Response
} from 'express'
import _ from 'lodash'
import BotFactory from '../bot/factory'
import {
  Context, EndpointAction, MiddlewareHandler
} from '../types/modules'
import log from '../utils/logger'

const apiRouter = express.Router()

const runMiddlewares = async (
  middlewares: MiddlewareHandler[],
  ctx: Context,
  action: EndpointAction,
  next: NextFunction
) => {
  let nextHandler: NextFunction = next
  for (let i = middlewares.length - 1; i >= 0; i--) {
    const handler = middlewares[i]
    const currHandler = handler.bind(null, ctx, action, nextHandler)
    nextHandler = currHandler
  }
  const firstHandler: NextFunction = nextHandler
  await firstHandler()
}

const apiHandler = async (req: Request, res: Response, next: NextFunction) => {
  const ctx: Context = {
    params: req
  }
  const { endpointId } = req.params
  const { endpoint } = BotFactory.getDefaultBot()
  const endpointAction = endpoint.get(endpointId)
  if (!endpointAction) {
    log.error(`endpointId not found:${endpointId}`)
    res.status(404)
      .send({
        data: 'Not found'
      })
    return
  }
  const { handler, before: beforeMiddlewares } = endpointAction
  if (beforeMiddlewares?.length) {
    await runMiddlewares(beforeMiddlewares, ctx, endpointAction, next)
  }
  const handlerBounded = handler.bind(null, ctx)
  const { response, status } = await handlerBounded()
  res
    .status(status)
    .send(response)
}

apiRouter.use('/api/health-check', (req: Request, res: Response) => res.status(200)
  .send({
    data: 'hello, world'
  }))
apiRouter.use('/api/:endpointId', apiHandler)

export default apiRouter
