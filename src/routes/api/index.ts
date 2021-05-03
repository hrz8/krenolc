import express, { Request, Response } from 'express'
import { getManager } from 'typeorm'

import defautlMiddlewares from './middlewares/default'
import defaultHandler from './handler'

export default (path = '/api'): express.Router => {
    const apiRouter = express.Router()
    apiRouter.use(`${path}/health-check`, async (req: Request, res: Response) => {
        const manager = getManager()
        await manager.query('SELECT 1+1 AS result')
        res
            .status(200)
            .send({
                data: 'ok'
            })
    })
    apiRouter.use(`${path}/:version/:moduleId/:endpointId`, ...defautlMiddlewares, defaultHandler)
    apiRouter.use(`${path}/:moduleId/:endpointId`, ...defautlMiddlewares, defaultHandler)
    return apiRouter
}
