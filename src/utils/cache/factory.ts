import cacheManager from 'cache-manager'
import redis from 'cache-manager-redis'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { getEnv } from '../env'

dayjs.extend(duration)
const ONE_DAY_SEC = dayjs.duration(1, 'day')
  .asSeconds()

export interface RedisCacheManager extends cacheManager.Cache {
  keys(...args: any[]): Promise<any>
}

export default class CacheFactory {
  private static redisCache: RedisCacheManager

  public static async init(): Promise<void> {
    const host = getEnv<string>('REDIS_HOST', 'localhost')
    const port = getEnv<number>('REDIS_PORT', 6379)
    const authPass = getEnv<string>('REDIS_PASSWORD', '')
    const db = getEnv<number>('REDIS_DB', 0)
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
