import {
    NextFunction, Request, Response
} from 'express'
import Joi from 'joi'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import jwksRsa from 'jwks-rsa'
import _toNumber from 'lodash/toNumber'
import _keys from 'lodash/keys'
import _omit from 'lodash/omit'

import BotFactory from '@/utils/bot/factory'
import EnvFactory from '@/utils/env'
import log from '@/utils/logger'

import { EndpointAction } from '@/types/endpoint'

import { ApiError } from './error'

const versionRegex = new RegExp('^v\\d+(\\.*\\d+)*$')

const paramsSchema = () => Joi.object({
    version: Joi
        .string()
        .pattern(versionRegex)
        .optional(),
    moduleId: Joi
        .string()
        .required(),
    endpointId: Joi
        .string()
        .required()
})

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

export default [
    (
        req: Request,
        res: Response,
        next: NextFunction
    ): void | undefined => {
        const reqParams = req.params
        const isThereVersion = Boolean(_keys(reqParams)
            .reduce((accum, curr) => accum + (versionRegex.test(reqParams[curr]) ? 1 : 0), 0))
        const { value, error } = paramsSchema()
            .validate(reqParams)
        const versionButLess = isThereVersion && !(_keys(reqParams).length === 3)
        if (error || versionButLess) {
            const errorMessage = versionButLess ? 'version path is not valid' : `version value is not valid: ${value.version}`
            const errorData = versionButLess ? {
                version: value.moduleId,
                path   : value.endpointId
            } : {
                version: value.version
            }
            log.error(errorMessage)
            const err = ApiError.VersionNotValid(errorData, errorMessage)
            res
                .status(_toNumber(err.status))
                .send(err)
            return
        }
        next()
    },
    (
        req: Request,
        res: Response,
        next: NextFunction
    ): void | undefined => {
        const { moduleId, endpointId } = req.params
        const version: string = req.params.version || 'v1'
        const systemDefaultBot = BotFactory.getSystemBot()

        const { endpoint } = systemDefaultBot

        const action: EndpointAction | undefined = endpoint.get(`${version}-${moduleId}-${endpointId}`)

        // endpoint not found
        if (!action) {
            log.error(`endpointId not found: ${version}-${moduleId}-${endpointId}`)
            const err = ApiError.EndpointNotFound({
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
            return
        }

        res.locals.bot = systemDefaultBot
        res.locals.action = action
        res.locals.version = version
        res.locals.moduleId = moduleId
        res.locals.endpointId = endpointId
        next()
    },
    (
        req: Request,
        res: Response,
        next: NextFunction
    ): void | undefined => {
        const {
            action, version, moduleId, endpointId
        } = res.locals as {
            action: EndpointAction,
            version: string,
            moduleId: string,
            endpointId: string,
        }
        const { method } = action

        // validate HTTP method
        if (method && req.method !== method) {
            log.error(`endpointId not found: ${version}-${moduleId}-${endpointId}`)
            const err = ApiError.EndpointNotFound({
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
            return
        }
        next()
    },
    async (
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
    },
    (
        req: Request,
        res: Response,
        next: NextFunction
    ): void | undefined => {
        const {
            action, version, moduleId, endpointId
        } = res.locals
        const { validator } = action as EndpointAction

        const {
            params, query, body, headers: fullHeaders
        } = req

        const headers = _omit(fullHeaders, 'authorization')
        const actionParams = {
            params,
            query,
            body,
            headers
        }

        // validate ctx params
        if (validator) {
            const validateCtxParams = validator()
                .validate(actionParams)
            if (validateCtxParams?.error) {
                const errorMessage = validateCtxParams.error.message || 'request parameter not valid'
                const err = ApiError.ParameterNotValid({
                    params: actionParams,
                    version,
                    moduleId,
                    endpointId
                }, errorMessage)
                res
                    .status(_toNumber(err.status))
                    .send(err)
                return
            }
        }
        next()
    }
]
