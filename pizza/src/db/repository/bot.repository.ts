import { EntityRepository, getCustomRepository } from 'typeorm'

import Bot, { BotMetadata } from '@db/entities/bot.entity'
import BaseRepository from './base'

@EntityRepository(Bot)
export class BotRepository extends BaseRepository<Bot> {
    public async getLatestContent(): Promise<BotMetadata> {
        const bot = await this.findLatest()
        return bot?.metadata
    }

    public async getMetaByBrain(brain: string): Promise<BotMetadata> {
        const bot = await this.findOne({
            where: {
                brain
            }
        })
        const botMeta = bot?.metadata
        return botMeta || {} as BotMetadata
    }
}

export default (): BotRepository => getCustomRepository(BotRepository)
