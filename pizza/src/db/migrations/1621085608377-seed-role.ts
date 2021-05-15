import {
    getRepository, MigrationInterface, QueryRunner
} from 'typeorm'
import Role from '../entities/role.entity'
import roleSeeds from '../seeds/role.seed'

export default class seedRole1621085608377 implements MigrationInterface {
    public async up(_: QueryRunner): Promise<void> {
        await getRepository(Role)
            .save(roleSeeds)
    }

    public async down(_: QueryRunner): Promise<void> {
        // nothing
    }
}
