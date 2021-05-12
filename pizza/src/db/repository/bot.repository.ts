import { EntityRepository, getCustomRepository } from 'typeorm'

import Bot, { BotMetaData } from '@db/entities/bot.entity'
import BaseRepository from './base'

@EntityRepository(Bot)
export class BotRepository extends BaseRepository<Bot> {
    public async getLatestContent(): Promise<BotMetaData> {
        const bot = await this.findLatest()
        return bot?.metadata
    }

    public async getMetaByBrain(brain: string): Promise<BotMetaData> {
        const bot = await this.findOne({
            where: {
                brain
            }
        })
        const botMeta = bot?.metadata
        return botMeta || {} as BotMetaData
    }
}

export default (): BotRepository => getCustomRepository(BotRepository)
