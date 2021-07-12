import {
    getRepository, MigrationInterface, QueryRunner
} from 'typeorm'
import Bot from '../entities/bot.entity'
import botSeeds from '../seeds/bot.seed'

export default class seedBot1625884226797 implements MigrationInterface {
    public async up(_: QueryRunner): Promise<void> {
        await getRepository(Bot)
            .save(botSeeds)
    }

    public async down(_: QueryRunner): Promise<void> {
        // nothing
    }
}
