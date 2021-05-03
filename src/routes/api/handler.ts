import {
    NextFunction, Request, Response
} from 'express'
import _noop from 'lodash/noop'
import _get from 'lodash/get'
import jwt from 'jsonwebtoken'

import { SuccessResponse, Response as UtilsResponse } from '@/utils/responses/success'
import log from '@/utils/logger'
import { ONE_DAY_SEC } from '@/libs/constant'

import { IContext } from '@/types/action'
import { EndpointAction, MiddlewareHandler } from '@/types/endpoint'

import { apiErrorDefault } from './error'

const runMiddlewares = async (
    middlewares: MiddlewareHandler[],
    ctx: IContext
): Promise<void> => {
    let nextHandler: NextFunction = _noop
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

export default async (req: Request, res: Response): Promise<void | undefined> => {
    const {
        action, version, moduleId, endpointId, ctx
    } = res.locals as {
        action: EndpointAction,
        version: string,
        moduleId: string,
        endpointId: string,
        ctx: IContext
    }
    const {
        authentication, method, handler, before, after, cache
    } = action

    if (authentication) {
        const { authorization } = req.headers
        const token = authorization?.slice(7)
        const decoded = token && jwt.decode(token)
    }

    // prep handler function
    const handlerBounded = handler.bind(null, ctx)
    try {
        // run before middleware
        await runMiddlewares(before || [], ctx)

        // cache checking
        const cacheKey = `${method}-${version}-${moduleId}-${endpointId}`
        const cacheEnabled = cache === true || (cache && cache.enabled)
        const cacheData = cacheEnabled ? await ctx.utils.cacher.get(cacheKey) : null

        // run endpoint handler and get response
        const { data, meta } = (
            cacheEnabled && cacheData
                ? cacheData
                : await handlerBounded()
        ) as UtilsResponse

        // set to cache if cache enable and data is not there yet
        if (cacheEnabled && !cacheData) {
            await ctx.utils.cacher.set(cacheKey, {
                data,
                meta
            }, {
                ttl: _get(cache, 'ttl') || ONE_DAY_SEC
            })
        }

        const successResponse = new SuccessResponse(
            data,
            meta,
            {
                apiVersion: version,
                module    : moduleId,
                endpoint  : endpointId
            }
        )
        res
            .status(200)
            .send(successResponse)

        // run after middlewares
        await runMiddlewares(after || [], ctx)
    } catch (err) {
        log.error(`error while running action: ${method}: ${version}-${moduleId}-${endpointId}`)
        log.error(err)
        apiErrorDefault(res, version, moduleId, endpointId, err)
    }
}
