import { getRepository, Repository } from 'typeorm'

export default class BaseRepository<TEntity> extends Repository<TEntity> {
    public repository(): Repository<TEntity> {
        return getRepository(this.target)
    }

    public async findLatest(): Promise<TEntity> {
        const result = await this.repository()
            .createQueryBuilder(this.target.toString())
            .orderBy(`${this.target.toString()}.createdAt`, 'DESC')
            .limit(1)
            .getMany()
        return result[0]
    }
}
