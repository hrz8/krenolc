import { getRepository, Repository } from 'typeorm'

export default class BaseRepository<TEntity> extends Repository<TEntity> {
  public repository(): Repository<TEntity> {
    return getRepository(this.target)
  }

  public async findLatest(): Promise<TEntity> {
    const result = await this.repository()
      .createQueryBuilder('bot')
      .orderBy('bot.createdAt', 'DESC')
      .limit(1)
      .getMany()
    return result[0]
  }
}

// export default abstract class BaseRepository<TEntity> {
//   public repository(): Repository<TEntity>

//   find(): Promise<TEntity[]>
// }
