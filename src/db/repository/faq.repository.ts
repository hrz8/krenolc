import { EntityRepository, getCustomRepository } from 'typeorm'
import Faq, { Content as FaqContent } from '../entities/faq.entity'
import BaseRepository from './base'

@EntityRepository(Faq)
export class FaqRepo extends BaseRepository<Faq> {
  public async getLatestContent(): Promise<FaqContent> {
    const faq = await this.findLatest()
    return faq?.content
  }
}

export default (): FaqRepo => getCustomRepository(FaqRepo)
