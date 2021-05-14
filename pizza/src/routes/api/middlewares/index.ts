import { checkCors } from '@/middlewares/cors'

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
    checkCors,
    checkJwt,
    checkBotModule,
    checkPermission,
    checkParams
]
