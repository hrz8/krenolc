import env from 'env-var'
import dotenv, { DotenvConfigOptions } from 'dotenv'

export default class EnvFactory {
    public static init(): void {
        process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
        const { NODE_ENV: ENV } = process.env
        if (ENV === 'dev') {
            const envConfig: DotenvConfigOptions = {
                path : `${__dirname}/../../${ENV}.env`,
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
