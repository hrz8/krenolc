import { createServer } from 'http'

import 'reflect-metadata'
import express from 'express'

import 'tsconfig-paths/register'

import BotFactory from '@/bot/factory'
import connectDB from '@/db/connection'
import log from './utils/logger'
import setEnv from './utils/env'

import apiRouter from './routes/api'

const main = async () => {
  const app = express()

  await connectDB()
    .then(() => log.info('Database connected successfully'))
    .catch((err) => log.error(err.message))

  await BotFactory.init()

  app.use(express.json())
  app.use(express.urlencoded({
    limit   : '50mb',
    extended: true
  }))

  // - app routes
  app.use(apiRouter)

  // - http server
  const { PORT } = process.env
  const server = createServer(app)
  server.listen(
    PORT || 3009,
    () => log.info(`Server running on port ${PORT}`)
  )
}

(async function () {
  setEnv()
  await main()
}())
