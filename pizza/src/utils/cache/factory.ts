import env from 'env-var'
import cacheManager from 'cache-manager'
import redis from 'cache-manager-redis'

import { ONE_DAY_SEC } from '@/libs/constant'

export interface RedisCacheManager extends cacheManager.Cache {
    keys(...args: any[]): Promise<any>
}

export default class CacheFactory {
    private static redisCache: RedisCacheManager

    public static async init(): Promise<void> {
        const host = env.get('REDIS_HOST')
            .required()
            .asString()
        const port = env.get('REDIS_PORT')
            .required()
            .asIntPositive()
        const authPass = env.get('REDIS_PASSWORD')
            .required()
            .asString()
        const db = env.get('REDIS_DB')
            .required()
            .asIntPositive()
        const config: cacheManager.StoreConfig & cacheManager.CacheOptions = {
            store    : redis,
            host,
            port,
            auth_pass: authPass,
            db,
            ttl      : ONE_DAY_SEC
        }
        this.redisCache = cacheManager.caching(config) as RedisCacheManager
    }

    public static getCache(): RedisCacheManager {
        return this.redisCache
    }
}
