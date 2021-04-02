import { ConnectionOptions } from 'typeorm'
import setEnv from './src/utils/env'

const ormconfig = () => {
  // - get active environtment
  setEnv()

  // - slicing environtment vars
  const {
    NODE_ENV: ENV, DB_URL, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
  } = process.env

  // - set connection options
  const options: ConnectionOptions = {
    // - dbms
    type       : 'mysql',
    // - connection
    host       : DB_URL,
    port       : Number(DB_PORT),
    username   : DB_USER,
    password   : DB_PASSWORD,
    database   : DB_NAME,
    // - file-ing
    entities   : [`${__dirname}/src/db/entities/*.js`],
    migrations : [`${__dirname}/src/db/migrations/*.js`],
    subscribers: [`${__dirname}/src/db/subscribers/*.js`],
    // - typeorm cli
    cli        : {
      entitiesDir   : `${__dirname}/src/db/entities`,
      migrationsDir : `${__dirname}/src/db/migrations`,
      subscribersDir: `${__dirname}/src/db/subscribers`
    },
    // - other options
    logging    : ENV === 'dev',
    synchronize: true
  }
  return options
}

export default ormconfig()
