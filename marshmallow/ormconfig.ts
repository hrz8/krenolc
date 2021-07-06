import env from 'env-var'
import dotenv from 'dotenv'

import { ConnectionOptions } from 'typeorm'

const ormconfig = (): ConnectionOptions => {
    dotenv.config()

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
        }
    }
    return options
}

export default ormconfig()
