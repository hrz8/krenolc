import { Response } from 'express'
import _isError from 'lodash/isError'
import _toNumber from 'lodash/toNumber'

import EnvFactory from '@/utils/env'
import { ErrorCode, ErrorResponse } from '@/utils/responses/error'
import { BRAIN_DEFAULT } from '@/libs/constant'

type DataPayload = {
    version: string, moduleId: string, endpointId: string
}
export class ApiError extends ErrorCode {
    static VersionNotValid(data: any, message: string): ErrorResponse {
        const { version } = data
        return new ErrorResponse(
            data,
            400,
            message,
            `${this.namespace}-KRENOLC_${this.codedName}-001`,
            {
                apiVersion: version
            }
        )
    }

    static EndpointNotFound(_data: any, message: string): ErrorResponse {
        const {
            data, version, moduleId: module, endpointId: endpoint
        } = _data
        return new ErrorResponse(
            data,
            404,
            message,
            `${this.namespace}-KRENOLC_${this.codedName}-002`,
            {
                apiVersion: version,
                module,
                endpoint
            }
        )
    }

    static TokenRequired(data: DataPayload, message: string): ErrorResponse {
        const {
            version, moduleId: module, endpointId: endpoint
        } = data
        return new ErrorResponse(
            {
                name: `${this.name}_${ApiError.TokenRequired.name}`
            },
            401,
            message,
            `${this.namespace}-KRENOLC_${this.codedName}-003`,
            {
                apiVersion: version,
                module,
                endpoint
            }
        )
    }

    static TokenNotValid(data: DataPayload & { token: string }, message: string): ErrorResponse {
        const {
            token, version, moduleId: module, endpointId: endpoint
        } = data
        return new ErrorResponse(
            {
                name: `${this.name}_${ApiError.TokenNotValid.name}`,
                token
            },
            401,
            message,
            `${this.namespace}-KRENOLC_${this.codedName}-004`,
            {
                apiVersion: version,
                module,
                endpoint
            }
        )
    }

    static ParameterNotValid(data: DataPayload & { params: any }, message: string): ErrorResponse {
        const {
            version, params, moduleId: module, endpointId: endpoint
        } = data
        return new ErrorResponse(
            {
                name: `${this.name}_${ApiError.ParameterNotValid.name}`,
                ...params
            },
            400,
            message,
            `${this.namespace}-KRENOLC_${this.codedName}-005`,
            {
                apiVersion: version,
                module,
                endpoint
            }
        )
    }
}

export const apiErrorDefault = (
    res: Response,
    version: string,
    moduleId: string,
    endpointId: string,
    err: any
): void => {
    const isErrorObj = _isError(err)
    const errorData = EnvFactory.get<string>('NODE_ENV', 'dev') === 'dev' ? {
        message: err?.message || 'Server Error'
    } : {
        message: 'Server Error'
    }
    const brain = EnvFactory.get<string>('BRAIN', BRAIN_DEFAULT)
    const errorResponse = isErrorObj ? new ErrorResponse(
        errorData,
        500,
        'Relax! It\'s not your fault. We\'re sorry about this, but something wrong happen with our server 😢',
        `${brain}-KRENOLC_API_ERROR-500`,
        {
            apiVersion: version,
            module    : moduleId,
            endpoint  : endpointId
        }
    ) : {
        ...err,
        apiVersion: version
    } as ErrorResponse
    res
        .status(_toNumber(err.status || '500'))
        .send(errorResponse)
}
