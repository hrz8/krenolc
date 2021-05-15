import express, { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { v4 as uuid } from 'uuid'

import userRepository from '@/db/repository/user.repository'
import { cors } from '@/middlewares/cors'

import defautlMiddlewares from './middlewares'
import defaultHandler from './handler'

const loginHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { user } = req.body
    const userId = uuid()
    let userFromDb = await userRepository()
        .findOne({
            where: {
                email: user.email
            }
        })
    userFromDb = await userRepository()
        .save({
            id       : userFromDb ? userFromDb.id : userId,
            email    : user.email,
            name     : user.name,
            lastLogin: new Date(),
            metadata : {}
        })
    console.log(userFromDb)
}

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
    apiRouter.options('*', cors)
    apiRouter.post(`${path}/login`, cors, loginHandler)
    apiRouter.use(`${path}/:version/:moduleId/:endpointId`, ...defautlMiddlewares, defaultHandler)
    apiRouter.use(`${path}/:moduleId/:endpointId`, ...defautlMiddlewares, defaultHandler)
    return apiRouter
}
