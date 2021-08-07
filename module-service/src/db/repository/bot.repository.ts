import { EntityRepository, getCustomRepository } from 'typeorm'

import Bot from '@db/entities/bot.entity'
import BaseRepository from './base'

@EntityRepository(Bot)
export class BotRepository extends BaseRepository<Bot> {
    public async getModulesByBrain(brain: string): Promise<Bot> {
        const bot = await this.findOne({
            where: {
                brain
            }
        })
        return bot
    }
}

export default (): BotRepository => getCustomRepository(BotRepository)
