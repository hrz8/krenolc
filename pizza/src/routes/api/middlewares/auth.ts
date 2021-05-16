import {
    NextFunction, Request, Response
} from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import jwksRsa from 'jwks-rsa'
import _toNumber from 'lodash/toNumber'
import _ from 'lodash'

import User from '@db/entities/user.entity'
import userRepository from '@db/repository/user.repository'
import roleRepository from '@db/repository/role.repository'

import EnvFactory from '@/utils/env'
import CacheFactory from '@/utils/cache/factory'
import BotFactory from '@/utils/bot/factory'
import log from '@/utils/logger'

import { EndpointAction } from '@/types/endpoint'

import { ApiError } from '../error'
import Role from '~/src/db/entities/role.entity'

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
): Promise<void> => {
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
    const token = authorization?.split('Bearer ')[1]

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
        const { email: userEmail } = decoded['http://login.hirzi.site/metadata']

        // get user from db
        const cacher = CacheFactory.getCache()
        const cacheKey = `user.email:${userEmail}`
        const userCached = await cacher.get(cacheKey)
        let user = userCached as User
        if (!userCached) {
            user = await userRepository()
                .findOne({
                    where: {
                        email: userEmail
                    },
                    relations: [
                        'roles',
                        'permissions',
                        'roles.permissions'
                    ]
                }) as User
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

export const checkBotModule = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const {
        user, version, moduleId, endpointId
    } = res.locals as {
        user: User,
        version: string,
        moduleId: string,
        endpointId: string
    }
    const { bots: botBrains } = user.metadata

    for (const brain of botBrains) {
        const bot = BotFactory.getByBrain(brain)

        const { endpoint } = bot
        const action = endpoint.get(`${version}-${moduleId}-${endpointId}`) as EndpointAction
        if (action) {
            break
        }

        // endpoint not available for account's bot
        log.error(`endpointId not avaialble in account's bot: ${version}-${moduleId}-${endpointId}`)
        const err = ApiError.EndpointNotInBot({
            data: {
                method  : req.method,
                endpoint: req.baseUrl
            },
            version,
            moduleId,
            endpointId
        }, `${req.method} ${req.baseUrl} not available in your bot`)
        res
            .status(_toNumber(err.status))
            .send(err)
        return
    }

    next()
}

export const checkPermission = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
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

    if (authentication === false || actionPermissions === undefined) {
        next()
        return
    }

    const requiredPermissions = ['root', ...(actionPermissions)]
    const userRoles = user.roles || []
    const userPermissions = user.permissions?.map((p) => p.name) || []
    const userPermissionsFromRoles = userRoles.reduce((acc, curr) => {
        const rolePermissions = curr.permissions?.map((p) => p.name) || []
        return [...acc, ...rolePermissions]
    }, [] as string[])

    const userPermissionsFinal = [...userPermissions, ...userPermissionsFromRoles]
    if (_.chain(userPermissionsFinal)
        .intersection(requiredPermissions)
        .isEmpty()
        .value()) {
        log.error('user has no permission to access api')
        const errorMessage = 'you have no permission to access this api'
        const ownedPermissions = userPermissionsFinal
        const err = ApiError.HasNoPermission({
            requiredPermissions,
            ownedPermissions,
            version,
            moduleId,
            endpointId
        }, errorMessage)
        res
            .status(_toNumber(err.status))
            .send(err)
        return
    }

    next()
}
