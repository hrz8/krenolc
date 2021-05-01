import {
  NextFunction, Request, Response
} from 'express'
import Joi from 'joi'
import _toNumber from 'lodash/toNumber'

import BotFactory from '@/utils/bot/factory'
import log from '@/utils/logger'

import { IContext } from '@/types/action'
import { EndpointAction } from '@/types/endpoint'

import { ApiError } from './error'
import Context from '~/src/utils/context'

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

export default [
  (
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
  },
  (
    req: Request,
    res: Response,
    next: NextFunction
  ): void | undefined => {
    const { moduleId, endpointId } = req.params
    const version: string = req.params.version || 'v1'
    const bot = BotFactory.getDefaultBot()
    const { endpoint } = bot

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
    res.locals.bot = bot
    res.locals.action = action
    res.locals.version = version
    res.locals.moduleId = moduleId
    res.locals.endpointId = endpointId
    next()
  },
  (
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
  },
  (
    req: Request,
    res: Response,
    next: NextFunction
  ): void | undefined => {
    const {
      bot, action, version
    } = res.locals
    const { validator } = action as EndpointAction

    const {
      params, query, body, headers
    } = req
    const actionParams = {
      params,
      query,
      body,
      headers
    }

    // validate ctx params
    if (validator) {
      const validateCtxParams = validator()
        .validate(actionParams)
      if (validateCtxParams?.error) {
        const errorMessage = validateCtxParams.error.message || 'request parameter not valid'
        const err = ApiError.parameterNotValid({
          params: actionParams,
          version
        }, errorMessage)
        res
          .status(_toNumber(err.status || '500'))
          .send(err)
        return
      }
    }

    // build ctx
    const ctx: IContext = new Context({
      req,
      bot,
      action
    })

    res.locals.ctx = ctx
    next()
  }
]
