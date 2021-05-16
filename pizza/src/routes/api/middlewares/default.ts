import {
    NextFunction, Request, Response
} from 'express'
import Joi from 'joi'
import _toNumber from 'lodash/toNumber'
import _keys from 'lodash/keys'
import _omit from 'lodash/omit'

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

export const checkVersion = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
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
}

export const checkEndpoint = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { moduleId, endpointId } = req.params
    const version: string = req.params.version || 'v1'
    const systemDefaultBot = BotFactory.getSystemBot()

    const { endpoint } = systemDefaultBot

    const action = endpoint.get(`${version}-${moduleId}-${endpointId}`) as EndpointAction

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
}

export const checkMethod = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
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
}

export const checkParams = (
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
