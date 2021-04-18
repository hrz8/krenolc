import { NextFunction } from 'express'
import Joi from 'joi'

import { Response } from '@/utils/response'

import { Context, HTTPMethod } from './action'

export interface EndpointActionHandler {
  (
    ctx: Context
  ): Promise<Response> | Response
}

export interface MiddlewareHandler {
  (
    ctx: Context,
    next: NextFunction
  ): Promise<void> | void
}

export interface EndpointValidator {
  (): Joi.ObjectSchema<{
    query: Joi.ObjectSchema<any>,
    body: Joi.ObjectSchema<any>,
    headers: Joi.ObjectSchema<any>
  }>
}

export interface EndpointAction {
  before?: MiddlewareHandler[],
  after?: MiddlewareHandler[]
  method: HTTPMethod | HTTPMethod[]
  validator?: EndpointValidator
  handler: EndpointActionHandler
}

export interface EndpointActionCollection {
  [endpointId: string]: EndpointAction
}

export interface EndpointValidatorCollection {
  [validatorId: string]: EndpointValidator
}

export interface Endpoint {
  version?: string,
  actions: EndpointActionCollection
}
