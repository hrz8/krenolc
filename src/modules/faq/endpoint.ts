import { Request, Response } from 'express'
import Faq from '~/src/db/entities/faq.entity'
import BaseEndpoint from '../_base/endpoint'

export default class FaqEndpoint extends BaseEndpoint<Faq> {
  public async getDefault(req: Request, res: Response): Promise<void> {
    const faq = await this.repo.findLatest()
    res.status(200)
      .send(faq)
  }
}
