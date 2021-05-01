import { ConnectionOptions } from 'typeorm'
import { getEnv, initEnv } from '@/utils/env'

const ormconfig = () => {
  // - get active environtment
  initEnv()

  // - set connection options
  const options: ConnectionOptions = {
    // - dbms
    type       : 'mysql',
    // - connection
    host       : getEnv<string>('DB_HOST', 'localhost'),
    port       : getEnv<number>('DB_PORT', 3006),
    username   : getEnv<string>('DB_USER', 'root'),
    password   : getEnv<string>('DB_PASSWORD', ''),
    database   : getEnv<string>('DB_NAME', 'krenolc'),
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
    logging    : getEnv<string>('NODE_ENV', 'dev') === 'dev',
    synchronize: true
  }
  return options
}

export default ormconfig()
