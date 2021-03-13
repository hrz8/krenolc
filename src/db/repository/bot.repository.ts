import { EntityRepository, getCustomRepository } from 'typeorm'
import Bot, { Content as BotContent } from '../entities/bot.entity'
import BaseRepository from './base'

@EntityRepository(Bot)
export class BotRepo extends BaseRepository<Bot> {
  public async getLatestContent(): Promise<BotContent> {
    const bot = await this.findLatest()
    return bot?.content
  }
}

export default (): BotRepo => getCustomRepository(BotRepo)
