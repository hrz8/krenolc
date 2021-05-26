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

    public constructor(brain = 'system') {
        this.brain = brain
        this.load(brain)
            .catch(() => log.error(`Failed to load [${brain}] bot`))
    }

    public load(brain: string): Promise<BotTemplate> {
        if (brain !== 'system') {
            log.info(`Loading [${brain}] Bot`)
            return new Promise((res, rej) => {
                botRepository()
                    .getMetaByBrain(brain)
                    .then(({ modules }: BotMetaData): void => {
                        if (modules) {
                            try {
                                _keys(modules)
                                    .filter((moduleId): boolean => modules[moduleId]?.enabled)
                                    .forEach((moduleId): void => {
                                        this.modules.set(moduleId, modules[moduleId])
                                        this.loadModule(moduleId)
                                    })
                                log.info(`[${brain}] Bot load process completed`)
                                res(this)
                            } catch (err) {
                                log.error(`failed when load [${brain}] Bot modules`)
                                log.error(err.message)
                                rej(err)
                            }
                        }
                    })
                    .catch((err) => {
                        log.error(`failed to fetch [${brain}] Bot metadata from db`)
                        log.error(err.message)
                        rej(err)
                    })
            })
        }
        log.info('Loading [system] Bot')
        return new Promise((res, rej) => {
            try {
                _keys(Modules)
                    .forEach((moduleId): void => {
                        this.modules.set(moduleId, Modules[moduleId])
                        this.loadModule(moduleId)
                    })
                log.info('[system] Bot load process completed')
                res(this)
            } catch (err) {
                log.error('failed when load [system] bot modules')
                log.error(err.message)
                rej(err)
            }
        })
    }

    public loadModule(moduleId: string): void {
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
