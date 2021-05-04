import {
    NextFunction, Request, Response
} from 'express'
import _omit from 'lodash/omit'

import { EndpointAction } from '@/types/endpoint'

import { ApiError } from '../error'

export default (
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
            throw err
        }
    }
    next()
}
