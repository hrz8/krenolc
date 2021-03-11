import { getRepository, Repository } from 'typeorm'
import Faq, { FaqInsertPayload } from '../entities/faq.entity'

const faqRepository = (): Repository<Faq> => getRepository(Faq)

const create = (payload: FaqInsertPayload): Promise<Faq> => faqRepository()
  .create(payload)
  .save()

const find = (): Promise<Faq[]> => faqRepository()
  .find()

export {
  create,
  find,
  faqRepository
}
