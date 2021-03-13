import express, { Request, Response } from 'express'

const apiRouter = express.Router()

apiRouter.use('/api/health-check', (req: Request, res: Response) => res.status(200)
  .send({
    data: 'hello, world'
  }))

export default apiRouter
