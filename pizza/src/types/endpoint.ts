import { NextFunction } from 'express'
import Joi from 'joi'

import { Response } from '@/utils/responses/success'

import { IContext, HTTPMethod } from './action'

export interface EndpointActionHandler {
    (
        ctx: IContext
    ): Promise<Response> | Response
}

export interface MiddlewareHandler {
    (
        ctx: IContext,
        next: NextFunction
    ): Promise<void> | void
}

export type EndpointValidatorSchema = {
    params: Joi.ObjectSchema,
    query: Joi.ObjectSchema,
    body: Joi.ObjectSchema,
    headers: Joi.ObjectSchema
}

export interface EndpointValidator {
    (): Joi.ObjectSchema
}

export interface EndpointAction {
    authentication?: boolean,
    permissions?: string[],
    before?: MiddlewareHandler[],
    after?: MiddlewareHandler[]
    method: HTTPMethod | HTTPMethod[]
    cache?: {
        enabled: boolean,
        ttl: number
    } | boolean,
    validator?: EndpointValidator
    handler: EndpointActionHandler
}

export interface EndpointActionCollection {
    [endpointId: string]: EndpointAction
}

export interface Endpoint {
    version?: string,
    actions: EndpointActionCollection
}
