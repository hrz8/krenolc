import { createServer } from 'http'

import 'reflect-metadata'
import express from 'express'

import 'tsconfig-paths/register'

import connectDB from '@db/connection'

import BotFactory from '@/utils/bot/factory'
import CacheFactory from '@/utils/cache/factory'
import log from '@/utils/logger'
import { getEnv, initEnv } from '@/utils/env'

import apiRouter from '@/routes/api'
import errorRouter from '@/routes/error'

const main = async () => {
  const app = express()

  await connectDB()
    .then(() => log.info('Database connected successfully'))
    .catch((err) => log.error(err.message))

  await BotFactory.init()
  await CacheFactory.init()

  // express body parser
  app.use(express.json())
  app.use(express.urlencoded({
    limit   : '50mb',
    extended: true
  }))

  // - app routes
  app.use(apiRouter())
  app.use(errorRouter())

  // - http server
  const PORT = getEnv<number>('PORT', 3009)
  const server = createServer(app)
  server.listen(
    PORT,
    () => log.info(`Server running on port ${PORT}`)
  )
}

(async function () {
  initEnv()
  await main()
}())
