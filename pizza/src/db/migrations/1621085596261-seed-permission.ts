import {
    getRepository, MigrationInterface, QueryRunner
} from 'typeorm'
import Permission from '../entities/permission.entity'
import permissionSeeds from '../seeds/permission.seed'

export default class seedPermission1621085596261 implements MigrationInterface {
    public async up(_: QueryRunner): Promise<void> {
        await getRepository(Permission)
            .save(permissionSeeds)
    }

    public async down(_: QueryRunner): Promise<void> {
        // nothing
    }
}
