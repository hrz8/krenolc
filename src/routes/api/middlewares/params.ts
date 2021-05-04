import {
    NextFunction, Request, Response
} from 'express'
import _toNumber from 'lodash/toNumber'

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
        params, query, body, headers
    } = req
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
                .status(_toNumber(err.status || '500'))
                .send(err)
            return
        }
    }
    next()
}
