import { createServer } from 'http'

import 'reflect-metadata'
import express from 'express'
import dotenv, { DotenvConfigOptions } from 'dotenv'
import bodyParser from 'body-parser'

import 'tsconfig-paths/register'

import connectDB from '@/db/connection'
import log from './utils/logger'

// - environtment configuration initiate
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
const { NODE_ENV: ENV } = process.env
const envConfig: DotenvConfigOptions = {
  path : `${__dirname}/../.env/${ENV}`,
  debug: ENV === 'dev'
}
dotenv.config(envConfig)

const main = async () => {
  const app = express()

  await connectDB()
    .then(() => log.info('Database successfully connected'))
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
  await main()
}())
