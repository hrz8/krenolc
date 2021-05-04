import {
    NextFunction, Request, Response
} from 'express'
import Joi from 'joi'
import _toNumber from 'lodash/toNumber'
import _keys from 'lodash/keys'

import BotFactory from '@/utils/bot/factory'
import log from '@/utils/logger'

import { EndpointAction } from '@/types/endpoint'

import { ApiError } from '../error'

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
                .status(_toNumber(err.status || '500'))
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
        const bot = BotFactory.getDefaultBot()
        const { endpoint } = bot

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
                .status(_toNumber(err.status || '500'))
                .send(err)
            return
        }

        res.locals.bot = bot
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
            throw err
        }
        next()
    }
]
