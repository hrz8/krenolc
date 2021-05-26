import env from 'env-var'
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

    public static get<T>(key: string, defaultValue: T): T {
        let value = env.get(key)
            .asString() as T | undefined
        switch (typeof defaultValue) {
        case 'number':
            value = env.get(key)
                .asInt() as T | undefined
            break
        case 'boolean':
            value = env.get(key)
                .asBool() as T | undefined
            break
        default:
            break
        }
        return value || defaultValue
    }
}
