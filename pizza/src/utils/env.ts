import dotenv, { DotenvConfigOptions } from 'dotenv'

export default class EnvFactory {
    public static init(): void {
        const { NODE_ENV: ENV, NODE_MODE: MODE } = process.env
        if (MODE === 'debug') {
            const envConfig: DotenvConfigOptions = {
                path : `${__dirname}/../../.env/${ENV || 'development'}.env`,
                debug: true
            }
            dotenv.config(envConfig)
        }
    }
}
