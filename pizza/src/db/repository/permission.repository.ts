import { EntityRepository, getCustomRepository } from 'typeorm'

import Permission from '@db/entities/permission.entity'
import BaseRepository from './base'

@EntityRepository(Permission)
export class PermissionRepository extends BaseRepository<Permission> {}

export default (): PermissionRepository => getCustomRepository(PermissionRepository)
