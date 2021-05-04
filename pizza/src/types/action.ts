/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Request } from 'express'
import BotTemplate from '../utils/bot/template'
import { RedisCacheManager } from '../utils/cache/factory'
import { EndpointAction } from './endpoint'

export enum HTTPMethod {
    CONNECT = 'CONNECT',
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    TRACE = 'TRACE'
}

export interface IContext {
    params: {
        params: any,
        query: any,
        body: any,
        headers: any
    },
    utils: {
        bot: BotTemplate,
        cacher: RedisCacheManager
    },
    baseUrl: string,
    action: EndpointAction,
    method: HTTPMethod,
    request: Request,
    meta: Record<string, any>
}
