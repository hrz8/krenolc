import {
    NextFunction, Request, Response
} from 'express'
import jwt from 'jsonwebtoken'

import EnvFactory from '@/utils/env'
import { EndpointAction } from '@/types/endpoint'

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
        const secret = EnvFactory.get<string>('AUTH0_JWT_SECRET', 'secret')
        try {
            const decoded1 = jwt.decode(token)
            const decoded = await jwt.verify(token, secret)
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
