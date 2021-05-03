import {
    NextFunction, Request, Response
} from 'express'
import jwt from 'jsonwebtoken'

import EnvFactory from '@/utils/env'
import { EndpointAction } from '@/types/endpoint'

import jwksRsa from 'jwks-rsa'
import { ApiError } from '../error'

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

    const { authorization } = req.headers
    const token = authorization?.slice(7)
    if (authentication && token) {
        const clientSecret = EnvFactory.get<string>('AUTH0_JWT_SECRET', 'secret')
        const AUTH0_DOMAIN = EnvFactory.get<string>('AUTH0_DOMAIN', 'domain.auth0.com')
        const AUTH0_KID = EnvFactory.get<string>('AUTH0_KID', 'kid')
        try {
            const decoded1 = jwt.decode(token)
            const client = jwksRsa({
                cache          : true,
                cacheMaxEntries: 5,
                cacheMaxAge    : 600000,
                jwksUri        : `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
            })
            const key = await client.getSigningKey(AUTH0_KID)
            const secret = key.getPublicKey()
            const decoded = jwt.verify(token, secret, {
                algorithms: ['RS256']
            })
            console.log(decoded)
        } catch (error) {
            const tokenErr = ApiError.tokenNotValid({
                token,
                version,
                moduleId,
                endpointId
            }, 'access token not valid 🔑')
            throw tokenErr
        }
    }
    next()
}
