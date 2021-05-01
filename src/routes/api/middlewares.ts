import {
  NextFunction, Request, Response
} from 'express'
import Joi from 'joi'
import _toNumber from 'lodash/toNumber'

import BotFactory from '@/bot/factory'
import log from '@/utils/logger'

import { Context, HTTPMethod } from '@/types/action'
import { EndpointAction } from '@/types/endpoint'

import { ApiError } from './error'

const paramsSchema = () => Joi.object({
  version: Joi
    .string()
    .pattern(new RegExp('^v\\d+(\\.*\\d+)*$'))
    .optional(),
  moduleId: Joi
    .string()
    .required(),
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
    const errorMessage = `version value is not valid: ${value.version}`
    const errorData = {
      version: value.version
    }
    log.error(errorMessage)
    const err = ApiError.versionNotValid(errorData, errorMessage)
    res
      .status(_toNumber(err.status || '500'))
      .send(err)
    return
  }
  next()
}

const actionAvailabilityHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void | undefined => {
  const { moduleId, endpointId } = req.params
  const version: string = req.params.version || 'v1'
  const { endpoint } = BotFactory.getDefaultBot()

  const action: EndpointAction | undefined = endpoint.get(`${version}-${moduleId}-${endpointId}`)
  if (!action) {
    log.error(`endpointId not found: ${version}-${moduleId}-${endpointId}`)
    const err = ApiError.endpointNotFound({
      method  : req.method,
      endpoint: req.baseUrl,
      version
    }, `${req.method} ${req.baseUrl} not found`)
    res
      .status(_toNumber(err.status || '500'))
      .send(err)
    return
  }
  res.locals.action = action
  res.locals.version = version
  res.locals.moduleId = moduleId
  res.locals.endpointId = endpointId
  next()
}

const httpMethodHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void | undefined => {
  const {
    action, version, moduleId, endpointId
  } = res.locals
  const { method } = action as EndpointAction

  // validate HTTP method
  if (method && req.method !== method) {
    log.error(`endpointId not found: ${version}-${moduleId}-${endpointId}`)
    const err = ApiError.endpointNotFound({
      method  : req.method,
      endpoint: req.baseUrl,
      version
    }, `${req.method} ${req.baseUrl} not found`)
    res
      .status(_toNumber(err.status || '500'))
      .send(err)
    return
  }
  next()
}

const validatorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void | undefined => {
  const { action, version } = res.locals
  const { validator } = action as EndpointAction

  // build ctx
  const ctx: Context = buildContext(req, action)

  // validate ctx params
  if (validator) {
    const validateCtxParams = validator()
      .validate(ctx.params)
    if (validateCtxParams?.error) {
      const errorMessage = validateCtxParams.error.message || 'request parameter not valid'
      const err = ApiError.parameterNotValid({
        params: ctx.params,
        version
      }, errorMessage)
      res
        .status(_toNumber(err.status || '500'))
        .send(err)
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
