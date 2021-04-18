import { createServer } from 'http'

import 'reflect-metadata'
import express from 'express'
import errors from 'common-errors'

import 'tsconfig-paths/register'

import BotFactory from '@/bot/factory'
import connectDB from '@db/connection'
import log from '@/utils/logger'
import setEnv from '@/utils/env'

import apiRouter from '@/routes/api'

const main = async () => {
  const app = express()

  await connectDB()
    .then(() => log.info('Database connected successfully'))
    .catch((err) => log.error(err.message))

  await BotFactory.init()

  // express body parser
  app.use(express.json())
  app.use(express.urlencoded({
    limit   : '50mb',
    extended: true
  }))

  // - app routes
  app.use(apiRouter())

  // - http server
  const PORT = process.env.PORT || 3009
  const server = createServer(app)
  server.listen(
    PORT,
    () => log.info(`Server running on port ${PORT}`)
  )
}

(async function () {
  setEnv()
  await main()
}())
