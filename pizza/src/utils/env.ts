import env from 'env-var'
import dotenv, { DotenvConfigOptions } from 'dotenv'

export default class EnvFactory {
    public static init(): void {
        let envConfig: DotenvConfigOptions
        const { NODE_ENV: ENV, NODE_MODE: MODE } = process.env
        if (MODE === 'debug') {
            envConfig = {
                path : `${__dirname}/../../.env/${ENV || 'development'}.env`,
                debug: true
            }
        } else {
            envConfig = {
                path: env.get('ENV_PATH')
                    .required()
                    .asString()
            }
        }
        dotenv.config(envConfig)
    }
}
