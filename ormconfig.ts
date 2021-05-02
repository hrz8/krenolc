import { ConnectionOptions } from 'typeorm'
import EnvFactory from '@/utils/env'

const ormconfig = () => {
  // - get active environtment
  EnvFactory.init()

  // - set connection options
  const options: ConnectionOptions = {
    // - dbms
    type       : 'mysql',
    // - connection
    host       : EnvFactory.get<string>('DB_HOST', 'localhost'),
    port       : EnvFactory.get<number>('DB_PORT', 3006),
    username   : EnvFactory.get<string>('DB_USER', 'root'),
    password   : EnvFactory.get<string>('DB_PASSWORD', ''),
    database   : EnvFactory.get<string>('DB_NAME', 'krenolc'),
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
    logging    : EnvFactory.get<string>('NODE_ENV', 'dev') === 'dev',
    synchronize: true
  }
  return options
}

export default ormconfig()
