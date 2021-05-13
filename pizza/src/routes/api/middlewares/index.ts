import {
    checkBotModule, checkJwt, checkPermission
} from './auth'
import {
    checkEndpoint, checkMethod, checkParams, checkVersion
} from './default'

export default [
    checkVersion,
    checkEndpoint,
    checkMethod,
    checkJwt,
    checkBotModule,
    checkPermission,
    checkParams
]
