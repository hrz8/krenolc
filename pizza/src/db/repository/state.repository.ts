import { EntityRepository, getCustomRepository } from 'typeorm'

import State from '@db/entities/state.entity'
import BaseRepository from './base'

@EntityRepository(State)
export class StateRepository extends BaseRepository<State> {}

export default (): StateRepository => getCustomRepository(StateRepository)
