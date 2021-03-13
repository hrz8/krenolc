import log from '../utils/logger'
import Modules, { ModuleType } from '../modules'

import botRepository from '../db/repository/bot.repository'
import { Content as BotContent } from '../db/entities/bot.entity'

export default class BotTemplate {
  public brain = ''

  public modules = new Map<string, any>();

  public endpoint = new Map<string, any>();

  public constructor(brain: string) {
    this.brain = brain
    this.load(brain)
      .catch(() => log.error('Failed to load bot'))
  }

  public load(brain: string): Promise<void> {
    log.info(`Loading ${brain} bot`)
    return botRepository()
      .getLatestContent()
      .then(({ modules, content }: BotContent): void => {
        console.log(modules, content)
        Object
          .keys(modules)
          .filter((moduleId): boolean => modules[moduleId]?.enabled)
          .forEach((moduleId): void => {
            this.modules.set(moduleId, modules[moduleId])
            this.loadModule({
              moduleId
            })
          })
      })
      .catch((err) => {
        log.error('Failed to fetch content of bot from repository')
        log.error(err.message)
      })
      .finally(() => {
        log.info('Bot load process completed')
      })
  }

  public loadModule({ moduleId }: { moduleId: string }): void {
    const module: Readonly<ModuleType> = Modules[moduleId]()
    const { endpoint } = module
    const endpoints = this.loadEndpoint(endpoint)
    endpoints.forEach((element: any) => {
      const g = endpoint[element]
      console.log(g)
    })
    console.log(endpoint)
  }

  private loadEndpoint(endpoint: any): any {
    const endpoints = Reflect
      .ownKeys(
        Object.getPrototypeOf(endpoint)
      )
      .filter((ep) => ep !== 'constructor')
    console.log(endpoints)
    return endpoints
  }
}
