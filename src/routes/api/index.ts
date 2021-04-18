import express, { Request, Response } from 'express'
import middlewareHandlers from './middlewares'
import defaultHandler from './handler'

export default (path = '/api'): express.Router => {
  const apiRouter = express.Router()
  apiRouter.use(`${path}/health-check`, (req: Request, res: Response) => res.status(200)
    .send({
      data: 'ok'
    }))
  apiRouter.use(`${path}/:version/:moduleId/:endpointId`, ...middlewareHandlers, defaultHandler)
  apiRouter.use(`${path}/:moduleId/:endpointId`, ...middlewareHandlers, defaultHandler)
  return apiRouter
}
