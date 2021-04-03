import _ from 'lodash'

import log from '../utils/logger'
import Modules, { ModuleType } from '../modules'

import botRepository from '../db/repository/bot.repository'
import { Content as BotContent } from '../db/entities/bot.entity'
import { EndpointAction } from '../types/endpoint'

export default class BotTemplate {
  public brain = ''

  public modules = new Map<string, any>();

  public endpoint = new Map<string, EndpointAction>();

  public constructor(brain: string) {
    this.brain = brain
    this.load(brain)
      .catch(() => log.error('Failed to load bot'))
  }

  public load(brain: string): Promise<void> {
    log.info(`Loading ${brain} bot`)
    return botRepository()
      .getLatestContent()
      .then(({ modules }: BotContent): void => {
        if (modules) {
          _
            .keys(modules)
            .filter((moduleId): boolean => modules[moduleId]?.enabled)
            .forEach((moduleId): void => {
              this.modules.set(moduleId, modules[moduleId])
              this.loadModule({
                moduleId
              })
            })
        }
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
    const { endpoints } = module
    _
      .forEach(endpoints, (endpoint) => {
        const { version, actions } = endpoint
        _
          .keys(actions)
          .forEach((objKey) => {
            const action = actions[objKey]
            const mapKey = `v${version || 1}-${moduleId}-${_.kebabCase(objKey)}`
            this.endpoint.set(mapKey, action)
          })
      })
  }
}
