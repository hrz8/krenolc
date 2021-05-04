import { EntityRepository, getCustomRepository } from 'typeorm'

import Faq, { Content as FaqContent } from '@db/entities/faq.entity'
import BaseRepository from './base'

@EntityRepository(Faq)
export class FaqRepository extends BaseRepository<Faq> {
    public async getLatestContent(): Promise<FaqContent> {
        try {
            const faq = await this.findLatest()
            return faq?.content
        } catch (error) {
            return {} as FaqContent
        }
    }

    public async getAllContent(): Promise<FaqContent[]> {
        try {
            const faq = await this.find()
            return faq.map((f: any) => f.content)
        } catch (error) {
            return [] as FaqContent[]
        }
    }
}

export default (): FaqRepository => getCustomRepository(FaqRepository)
