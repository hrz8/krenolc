import express, {
  NextFunction, Request, Response
} from 'express'
import _ from 'lodash'
import BotFactory from '../bot/factory'
import {
  Context, EndpointAction, MiddlewareHandler
} from '../types/modules'
import log from '../utils/logger'
import { SuccessResponse, Response as UtilsResponse } from '../utils/response'

const apiRouter = express.Router()

const runMiddlewares = async (
  middlewares: MiddlewareHandler[],
  ctx: Context,
  action: EndpointAction
): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let nextHandler: NextFunction = (): void => {}
  for (let i = middlewares.length - 1; i >= 0; i--) {
    const handler = middlewares[i]
    const currHandler = handler.bind(
      null, ctx, action, nextHandler
    )
    nextHandler = currHandler
  }
  const firstHandler: NextFunction = nextHandler
  await firstHandler()
}

const apiHandler = async (req: Request, res: Response) => {
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
  const { handler, before } = endpointAction
  await runMiddlewares(before, ctx, endpointAction)
  const handlerBounded = handler.bind(null, ctx)
  try {
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
  } catch (err) {
    res
      .status(500)
      .send(err)
  }
}

apiRouter.use('/api/health-check', (req: Request, res: Response) => res.status(200)
  .send({
    data: 'ok'
  }))
apiRouter.use('/api/:endpointId', apiHandler)

export default apiRouter
