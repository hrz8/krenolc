import BaseRepository from '../../db/repository/base'

export const Middleware = (middlewares: Array<any>) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  console.log(middlewares)
  console.log('g(): called')
}

export default class BaseEndpoint<TEntity> {
  public readonly repo: BaseRepository<TEntity>

  constructor(repo: BaseRepository<TEntity>) {
    this.repo = repo
  }
}
