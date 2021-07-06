import { EntityRepository, getCustomRepository } from 'typeorm'

import Bot from '@db/entities/bot.entity'
import BaseRepository from './base'

@EntityRepository(Bot)
export class BotRepository extends BaseRepository<Bot> {}

export default (): BotRepository => getCustomRepository(BotRepository)
