import { createServer } from 'http'

import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'

import 'tsconfig-paths/register'

import connectDB from '@/db/connection'
import log from './utils/logger'
import setEnv from './utils/env'

const main = async () => {
  const app = express()

  await connectDB()
    .then(() => log.info('Database connected successfully'))
    .catch((err) => log.error(err.message))

  // - body parser
  app.use(
    bodyParser.json({
      limit: '50mb'
    })
  )

  app.use(
    bodyParser.urlencoded({
      limit   : '50mb',
      extended: true
    })
  )

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
