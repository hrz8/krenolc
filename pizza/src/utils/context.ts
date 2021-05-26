import { Request } from 'express'

import { EndpointAction } from '@/types/endpoint'
import { HTTPMethod, IContext } from '@/types/action'

import BotTemplate from './bot/template'
import CacheFactory, { RedisCacheManager } from './cache/factory'
import nats, { INats } from './nats'

type ContextPayload = { req: Request, bot: BotTemplate, action: EndpointAction }

export default class Context implements IContext {
    params: {
        params: any,
        query: any,
        body: any,
        headers: any
    }

    utils: {
        bot: BotTemplate,
        cacher: RedisCacheManager,
        nats: INats
    }

    baseUrl: string

    action: EndpointAction

    method: HTTPMethod

    request: Request

    meta: Record<string, any>

    constructor({
        req, bot, action
    }: ContextPayload) {
        const {
            params, query, body, method, baseUrl, headers, ...rest
        } = req

        this.params = {
            params,
            query,
            body,
            headers
        }

        this.utils = {
            bot,
            cacher: CacheFactory.getCache(),
            nats
        }

        this.baseUrl = baseUrl
        this.action = action
        this.method = method as HTTPMethod
        this.request = rest as Request
        this.meta = {}
    }
}
