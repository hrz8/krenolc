import { EntityRepository, getCustomRepository } from 'typeorm'

import User from '@db/entities/user.entity'
import BaseRepository from './base'

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}

export default (): UserRepository => getCustomRepository(UserRepository)
