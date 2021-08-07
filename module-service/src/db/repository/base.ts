import { getRepository, Repository } from 'typeorm'

export default class BaseRepository<TEntity> extends Repository<TEntity> {
    public repository(): Repository<TEntity> {
        return getRepository(this.target)
    }
}
