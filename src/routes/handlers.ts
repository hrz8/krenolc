import {
  NextFunction, Request, Response
} from 'express'
import Joi from 'joi'

import BotFactory from '../bot/factory'
import log from '../utils/logger'

import { Context, HTTPMethod } from '../types/action'
import { EndpointAction } from '../types/endpoint'

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
    method : method as HTTPMethod,
    request: rest as Request,
    locals : {}
  }
}

const paramsHanlder = (
  req: Request,
  res: Response,
  next: NextFunction
): void | undefined => {
  const { value, error } = paramsSchema()
    .validate(req.params)
  if (error) {
    log.error(`version value is not valid: ${value.version}`)
    res
      .status(400)
      .send({
        error: error.message
      })
    return
  }
  next()
}

const actionAvailabilityHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void | undefined => {
  const { endpointId } = req.params
  const version: string = req.params.version || 'v1'
  const { endpoint } = BotFactory.getDefaultBot()

  const action: EndpointAction | undefined = endpoint.get(`${version}-${endpointId}`)
  if (!action) {
    log.error(`endpointId not found: ${version}-${endpointId}`)
    res
      .status(404)
      .send({
        error: `${req.method} ${req.baseUrl} not found`
      })
    return
  }
  res.locals.action = action
  res.locals.version = version
  res.locals.endpointId = endpointId
  next()
}

const httpMethodHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void | undefined => {
  const {
    action, version, endpointId
  } = res.locals
  const { method } = action as EndpointAction

  // validate HTTP method
  if (method && req.method !== method) {
    log.error(`endpointId not found: ${version}-${endpointId}`)
    res.status(404)
      .send({
        error: `${req.method} ${req.baseUrl} not found`
      })
    return
  }
  next()
}

const validatorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void | undefined => {
  const { action } = res.locals
  const { validator } = action as EndpointAction

  // build ctx
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
  res.locals.ctx = ctx
  next()
}

export default [
  paramsHanlder,
  actionAvailabilityHandler,
  httpMethodHandler,
  validatorHandler
]
