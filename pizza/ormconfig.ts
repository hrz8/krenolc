import env from 'env-var'

import { ConnectionOptions } from 'typeorm'
import EnvFactory from './src/utils/env'

const ormconfig = () => {
    // - get active environtment
    EnvFactory.init()

    // - set connection options
    const options: ConnectionOptions = {
        // - dbms
        type: 'postgres',
        // - connection
        host: env.get('DB_HOST')
            .required()
            .asString(),
        port: env.get('DB_PORT')
            .required()
            .asIntPositive(),
        username: env.get('DB_USER')
            .required()
            .asString(),
        password: env.get('DB_PASSWORD')
            .required()
            .asString(),
        database: env.get('DB_NAME')
            .required()
            .asString(),
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
        logging: env.get('NODE_MODE')
            .asString() === 'debug',
        synchronize: true
    }
    return options
}

export default ormconfig()
