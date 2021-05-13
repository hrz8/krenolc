import {
    NextFunction, Request, Response
} from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import jwksRsa from 'jwks-rsa'
import _toNumber from 'lodash/toNumber'
import _chain from 'lodash/chain'

import User from '@db/entities/user.entity'
import userRepository from '@db/repository/user.repository'

import EnvFactory from '@/utils/env'
import CacheFactory from '@/utils/cache/factory'
import log from '@/utils/logger'

import { EndpointAction } from '@/types/endpoint'

import { ApiError } from '../error'
import BotFactory from '~/src/utils/bot/factory'

const verify = (token: string, secret: string): Promise<any> => new Promise((resolve, reject) => {
    jwt.verify(token, secret, {
        algorithms: ['RS256']
    }, (err, decoded) => {
        if (err) {
            reject(err)
        }
        resolve(decoded)
    })
})

export const checkJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | undefined> => {
    const {
        action: { authentication }, version, moduleId, endpointId
    } = res.locals as {
        action: EndpointAction,
        version: string,
        moduleId: string,
        endpointId: string,
    }

    if (authentication === false) {
        next()
        return
    }

    // default is checking authentication
    const { authorization } = req.headers
    const token = authorization?.slice(7)

    if (!token) {
        const noTokenErr = ApiError.TokenRequired({
            version,
            moduleId,
            endpointId
        }, 'you\'re unauthorized, access token needed ⛔️')
        res
            .status(_toNumber(noTokenErr.status))
            .send(noTokenErr)
        return
    }

    try {
        const AUTH0_DOMAIN = EnvFactory.get<string>('AUTH0_DOMAIN', 'domain.auth0.com')
        const { header } = jwt.decode(token, {
            complete: true
        }) as { header: { kid: string, alg: string, typ: string } }
        const client = jwksRsa({
            cache          : true,
            cacheMaxEntries: 5,
            cacheMaxAge    : 600000,
            jwksUri        : `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
        })
        const key = await client.getSigningKey(header?.kid)
        const secret = key.getPublicKey()
        const decoded = await verify(token, secret)
        const userEmail = decoded['http://login.hirzi.site/email']

        // get user from db
        const cacher = CacheFactory.getCache()
        const cacheKey = `user:email.${userEmail}`
        const userCached = await cacher.get(cacheKey)
        const user = (userCached || await userRepository()
            .findOne({
                where: {
                    email: userEmail
                }
            })) as User
        if (!userCached) {
            await cacher.set(cacheKey, user)
        }
        res.locals.user = (user || null) as User
    } catch (err) {
        log.error('access token not valid')
        log.error(err.message)
        const tokenErr = ApiError.TokenNotValid({
            token,
            version,
            moduleId,
            endpointId
        }, `access token not valid 🔑${err instanceof JsonWebTokenError ? `, ${err.message}` : ''}`)
        res
            .status(_toNumber(tokenErr.status))
            .send(tokenErr)
        return
    }

    next()
}

export const checkBotModule = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | undefined> => {
    const {
        user, version, moduleId, endpointId
    } = res.locals as {
        user: User,
        version: string,
        moduleId: string,
        endpointId: string
    }
    const { bots } = user.metadata

    bots.forEach(async (brain) => {
        const bot = BotFactory.getByBrain(brain)

        if (!bot) {
            await BotFactory.loadByBrain(brain)
        }

        const { endpoint } = bot
        const action = endpoint.get(`${version}-${moduleId}-${endpointId}`) as EndpointAction

        // endpoint not available in account's bot
        if (!action) {
            log.error(`endpointId not avaialble in account's bot: ${version}-${moduleId}-${endpointId}`)
            const err = ApiError.EndpointNotInBot({
                data: {
                    method  : req.method,
                    endpoint: req.baseUrl
                },
                version,
                moduleId,
                endpointId
            }, `${req.method} ${req.baseUrl} not found`)
            res
                .status(_toNumber(err.status))
                .send(err)
        }
    })

    next()
}

export const checkPermission = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | undefined> => {
    const {
        action: { authentication, permissions: actionPermissions },
        version, moduleId, endpointId, user
    } = res.locals as {
        action: EndpointAction,
        version: string,
        moduleId: string,
        endpointId: string,
        user: User
    }

    if (authentication === false) {
        next()
        return
    }

    try {
        const neededPermissions = ['root', ...(actionPermissions || [])]
        const { metadata: { permissions: userPermissions, roles: userRoles } } = user
        const permissionsFromRoles = userRoles.map((role) => {
            console.log(role)
            return []
        })
        if (!_chain([...(userPermissions || []), ...permissionsFromRoles])
            .intersection(neededPermissions)
            .isEmpty()
            .value()) {
            log.info('have no permission')
        }
    } catch (error) {
        log.error('error')
    }
}
