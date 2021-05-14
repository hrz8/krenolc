import corsNode from 'cors'
import {
    NextFunction, Request, Response
} from 'express'
import { EndpointAction } from '~/src/types/endpoint'

const corsOptions = (req: any, callback: any) => {
    const whitelist = ['http://localhost:8009']

    let opts
    if (whitelist.indexOf(req.header('Origin')) > -1) {
        opts = {
            origin: true
        }
    } else {
        opts = {
            origin: false
        }
    }
    callback(null, opts)
}

export const cors = corsNode(corsOptions)

export const checkCors = (
    req: Request,
    res: Response,
    next: NextFunction
): void | undefined => {
    const { action } = res.locals as { action: EndpointAction }
    if (action.cors !== false) {
        cors(req, res, next)
    }
    next()
}
