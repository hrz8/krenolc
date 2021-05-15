import { EntityRepository, getCustomRepository } from 'typeorm'

import Role from '@db/entities/role.entity'
import BaseRepository from './base'

@EntityRepository(Role)
export class RoleRepository extends BaseRepository<Role> {}

export default (): RoleRepository => getCustomRepository(RoleRepository)
