import {
    NextFunction, Request, Response
} from 'express'
import jwt from 'jsonwebtoken'

import EnvFactory from '@/utils/env'
import { EndpointAction } from '@/types/endpoint'

import jwksRsa from 'jwks-rsa'
import { ApiError } from '../error'

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

export default async function (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | undefined> {
    const {
        action: { authentication }, version, moduleId, endpointId
    } = res.locals as {
        action: EndpointAction,
        version: string,
        moduleId: string,
        endpointId: string,
    }

    if (!authentication) {
        next()
        return
    }

    const { authorization } = req.headers
    const token = authorization?.slice(7)

    if (!token) {
        const tokenErr = ApiError.TokenRequired({
            version,
            moduleId,
            endpointId
        }, 'you\'re unauthorized, access token needed ⛔️')
        throw tokenErr
    }

    try {
        const AUTH0_DOMAIN = EnvFactory.get<string>('AUTH0_DOMAIN', 'domain.auth0.com')
        const { header, payload: decoded } = jwt.decode(token, {
            complete: true
        }) as { header: { kid: string}, payload: any }
        const client = jwksRsa({
            cache          : true,
            cacheMaxEntries: 5,
            cacheMaxAge    : 600000,
            jwksUri        : `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
        })
        const key = await client.getSigningKey(header?.kid)
        const secret = key.getPublicKey()
        await verify(token, secret)
    } catch (error) {
        const tokenErr = ApiError.TokenNotValid({
            token,
            version,
            moduleId,
            endpointId
        }, 'access token not valid 🔑')
        throw tokenErr
    }

    next()
}
