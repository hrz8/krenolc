import express, { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { v4 as uuid } from 'uuid'

import userRepository from '@/db/repository/user.repository'
import { cors } from '@/middlewares/cors'
import { SuccessResponse } from '@/utils/responses/success'

import defautlMiddlewares from './middlewares'
import mainHandler from './handler'

const loginHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { user } = req.body
    const userId = uuid()
    const userFromDb = await userRepository()
        .findOne({
            where: {
                email: user.email
            }
        })

    // upsert user, with primary key if exist
    await userRepository()
        .save({
            id       : userFromDb ? userFromDb.id : userId,
            email    : user.email,
            name     : user.name,
            lastLogin: new Date(),
            metadata : {
                bots: ['preview']
            }
        })

    // put response for post login
    const responseMessage = userFromDb
        ? `logged in as existing user with id: ${userFromDb.id}`
        : `logged in as new user with id: ${userId}`
    const successResponse = new SuccessResponse(user, {}, {
        responseMessage
    })
    res
        .status(200)
        .send(successResponse)
}

export default (path = '/api'): express.Router => {
    const apiRouter = express.Router()

    // health check endpoint
    apiRouter.use(`${path}/health-check`, async (req: Request, res: Response) => {
        const manager = getManager()
        await manager.query('SELECT 1+1 AS result')
        res
            .status(200)
            .send({
                data: 'ok'
            })
    })

    // enabling cors
    apiRouter.options(`${path}/*`, cors)

    // post login
    apiRouter.post(`${path}/login`, cors, loginHandler)

    // modules endpoint
    apiRouter.use(`${path}/:version/:moduleId/:endpointId`, ...defautlMiddlewares, mainHandler)
    apiRouter.use(`${path}/:moduleId/:endpointId`, ...defautlMiddlewares, mainHandler)
    return apiRouter
}
