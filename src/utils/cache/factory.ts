import cacheManager from 'cache-manager'
import redis from 'cache-manager-redis'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)
const ONE_DAY_SEC = dayjs.duration(1, 'day')
  .asSeconds()

export interface RedisCacheManager extends cacheManager.Cache {
  keys(...args: any[]): Promise<any>
}

export default class CacheFactory {
  private static redisCache: RedisCacheManager

  public static async init(): Promise<void> {
    const {
      REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_DB
    } = process.env
    const config: cacheManager.StoreConfig & cacheManager.CacheOptions = {
      store    : redis,
      host     : REDIS_HOST || 'localhost',
      port     : REDIS_PORT || 6379,
      auth_pass: REDIS_PASSWORD || '',
      db       : REDIS_DB || 0,
      ttl      : ONE_DAY_SEC
    }
    this.redisCache = cacheManager.caching(config) as RedisCacheManager
  }

  public static getCache(): RedisCacheManager {
    return this.redisCache
  }
}
