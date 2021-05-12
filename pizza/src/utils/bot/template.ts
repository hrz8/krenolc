import _keys from 'lodash/keys'
import _forEach from 'lodash/forEach'
import _kebabCase from 'lodash/kebabCase'

import Modules from '@/modules'
import botRepository from '@db/repository/bot.repository'
import { BotMetaData } from '@db/entities/bot.entity'
import log from '@/utils/logger'

import { EndpointAction } from '@/types/endpoint'
import { ModuleType } from '@/types/module'

export default class BotTemplate {
    public brain: string | undefined

    public modules = new Map<string, any>();

    public endpoint = new Map<string, EndpointAction>();

    public constructor(brain?: string) {
        this.brain = brain
        this.load(brain)
            .catch(() => log.error('Failed to load bot'))
    }

    public load(brain?: string): Promise<void> {
        if (brain) {
            log.info(`Loading ${brain} bot`)
            return botRepository()
                .getMetaByBrain(brain)
                .then(({ modules }: BotMetaData): void => {
                    if (modules) {
                        _keys(modules)
                            .filter((moduleId): boolean => modules[moduleId]?.enabled)
                            .forEach((moduleId): void => {
                                this.modules.set(moduleId, modules[moduleId])
                                this
                                    .loadModule({
                                        moduleId
                                    })
                                    .catch((err) => {
                                        log.error('failed to load modules')
                                        log.error(err.message)
                                    })
                            })
                    }
                    log.info('Bot load process completed')
                })
                .catch((err) => {
                    log.error('failed to fetch content of bot from repository')
                    log.error(err.message)
                })
        }
        log.info('Loading system bot')
        return new Promise(() => {
            _keys(Modules)
                .forEach((moduleId): void => {
                    this.modules.set(moduleId, Modules[moduleId])
                    this
                        .loadModule({
                            moduleId
                        })
                        .catch((err) => {
                            log.error('failed to load modules')
                            log.error(err.message)
                        })
                })
            log.info('System Bot load process completed')
        })
    }

    public async loadModule({ moduleId }: { moduleId: string }): Promise<void> {
        const module: Readonly<ModuleType> = Modules[moduleId]()
        const { endpoints } = module
        _forEach(endpoints, (endpoint) => {
            const { version: ver, actions } = endpoint
            const version = ver || '1'
            const versionRgx = new RegExp('^v\\d+(\\.*\\d+)*$')
            _keys(actions)
                .forEach((objKey) => {
                    const action = actions[objKey]
                    if (!versionRgx.test(`v${version}`)) {
                        throw new Error(`version value (${version}) of endpoint (${moduleId}-${objKey}) is not valid`)
                    }
                    const mapKey = `v${version}-${moduleId}-${_kebabCase(objKey)}`
                    this.endpoint.set(mapKey, action)
                })
        })
    }
}
