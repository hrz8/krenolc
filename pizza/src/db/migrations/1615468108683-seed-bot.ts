import {
    getRepository, MigrationInterface, QueryRunner
} from 'typeorm'
import Bot from '@db/entities/bot.entity'
import botSeeds from '@db/seeds/bot.seed'

export default class seedBot1615468108683 implements MigrationInterface {
    public async up(_: QueryRunner): Promise<void> {
        await getRepository(Bot)
            .save(botSeeds)
    }

    public async down(_: QueryRunner): Promise<void> {
        // nothing
    }
}
