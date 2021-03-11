import { EntityRepository, getCustomRepository } from 'typeorm'
import Bot, { BotContent } from '../entities/bot.entity'
import RepositoryBase from './base'

@EntityRepository(Bot)
export class BotRepo extends RepositoryBase<Bot> {
  public async fetchContent(): Promise<BotContent> {
    const bot = await this.findLatest()
    return bot?.content
  }
}

export const botRepository = (): BotRepo => getCustomRepository(BotRepo)
