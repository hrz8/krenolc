import { EntityRepository, getCustomRepository } from 'typeorm'

import Bot, { BotMeta } from '@db/entities/bot.entity'
import BaseRepository from './base'

@EntityRepository(Bot)
export class BotRepository extends BaseRepository<Bot> {
    public async getLatestContent(): Promise<BotMeta> {
        const bot = await this.findLatest()
        return bot?.meta
    }

    public async getMetaByBrain(brain: string): Promise<BotMeta> {
        const bot = await this.findOne({
            where: {
                brain
            }
        })
        const botMeta = bot?.meta
        return botMeta || {} as BotMeta
    }
}

export default (): BotRepository => getCustomRepository(BotRepository)
