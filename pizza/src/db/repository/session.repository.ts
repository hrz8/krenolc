import { EntityRepository, getCustomRepository } from 'typeorm'

import Session from '@db/entities/session.entity'
import BaseRepository from './base'

@EntityRepository(Session)
export class SessionRepository extends BaseRepository<Session> {}

export default (): SessionRepository => getCustomRepository(SessionRepository)
