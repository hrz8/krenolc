import {
  Connection, ConnectionOptions, createConnection
} from 'typeorm'

// - entities
import Faq from './entities/Faq'

export default () : Promise<Connection | void> => {
  const {
    NODE_ENV: ENV, DB_URL, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
  } = process.env
  const options: ConnectionOptions = {
    type       : 'mysql',
    // - connection
    host       : DB_URL,
    port       : Number(DB_PORT),
    username   : DB_USER,
    password   : DB_PASSWORD,
    database   : DB_NAME,
    // - options
    logging    : ENV === 'dev',
    synchronize: true,
    entities   : [
      Faq
    ],
    migrations: [
      `${__dirname}/migrations/**/*.{js}`
    ],
    subscribers: [
      `${__dirname}/subscribers/**/*.{js}`
    ],
    cli: {
      entitiesDir   : `${__dirname}/entities`,
      migrationsDir : `${__dirname}/migrations`,
      subscribersDir: `${__dirname}/subscribers`
    }
  }
  return createConnection(options)
}
