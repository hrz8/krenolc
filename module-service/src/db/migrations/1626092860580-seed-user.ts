import {
    getRepository, MigrationInterface, QueryRunner
} from 'typeorm'
import User from '../entities/user.entity'
import userSeeds from '../seeds/user.seed'

export default class seedUser1626092860580 implements MigrationInterface {
    public async up(_: QueryRunner): Promise<void> {
        await getRepository(User)
            .save(userSeeds)
    }

    public async down(_: QueryRunner): Promise<void> {
        // nothing
    }
}
