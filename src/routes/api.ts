import express, {
  NextFunction, Request, Response
} from 'express'
import _ from 'lodash'
import Joi from 'joi'
import BotFactory from '../bot/factory'
import { EndpointAction, MiddlewareHandler } from '../types/endpoint'
import { Context, HTTPMethod } from '../types/action'
import log from '../utils/logger'
import { SuccessResponse, Response as UtilsResponse } from '../utils/response'

const paramsSchema = () => Joi.object({
  version: Joi
    .string()
    .pattern(new RegExp('^v\\d+(\\.*\\d+)*$'))
    .optional(),
  endpointId: Joi
    .string()
    .required()
})

const buildContext = (req: Request, action: EndpointAction): Context => {
  const {
    query, body, method, baseUrl, headers, ...rest
  } = req
  return {
    params: {
      query,
      body,
      headers
    },
    baseUrl,
    action,
    method : method as HTTPMethod,
    request: rest as Request
  }
}

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

const apiHandler = async (req: Request, res: Response) => {
  const { value, error } = paramsSchema()
    .validate(req.params)
  if (error) {
    log.error(`version value is not valid: ${value.version}`)
    res.status(400)
      .send({
        error: error.message
      })
    return
  }

  const { endpointId } = value
  const version: string = value.version || 'v1'
  const { endpoint } = BotFactory.getDefaultBot()

  // get action object from endpoint
  const action = endpoint.get(`${version}-${endpointId}`)
  if (!action) {
    log.error(`endpointId not found: ${version}-${endpointId}`)
    res.status(404)
      .send({
        error: `${req.method} ${req.baseUrl} not found`
      })
    return
  }

  const {
    before, after, validator, method, handler
  } = action

  // validate HTTP method
  if (method && req.method !== method) {
    log.error(`endpointId not found: ${version}-${endpointId}`)
    res.status(404)
      .send({
        error: `${req.method} ${req.baseUrl} not found`
      })
    return
  }

  // get ctx
  const ctx: Context = buildContext(req, action)

  // validate ctx params
  if (validator) {
    const validateCtxParams = validator()
      .validate(ctx.params)
    if (validateCtxParams?.error) {
      res.status(400)
        .send({
          error: validateCtxParams.error.message
        })
      return
    }
  }

  // prep handler function
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

export default (path = '/api'): express.Router => {
  const apiRouter = express.Router()
  apiRouter.use(`${path}/health-check`, (req: Request, res: Response) => res.status(200)
    .send({
      data: 'ok'
    }))
  apiRouter.use(`${path}/:version/:endpointId`, apiHandler)
  apiRouter.use(`${path}/:endpointId`, apiHandler)
  return apiRouter
}
