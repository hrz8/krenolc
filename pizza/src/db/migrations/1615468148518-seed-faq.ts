import {
    getRepository, MigrationInterface, QueryRunner
} from 'typeorm'
import Faq from '../entities/faq.entity'
import faqSeeds from '../seeds/faq.seed'

export default class seedFaq1615468148518 implements MigrationInterface {
    public async up(_: QueryRunner): Promise<void> {
        await getRepository(Faq)
            .save(faqSeeds)
    }

    public async down(_: QueryRunner): Promise<void> {
        // nothing
    }
}
