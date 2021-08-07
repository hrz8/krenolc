import botRepository from '@/db/repository/bot.repository'
import Bot from '~/src/db/entities/bot.entity'

export default class BotStorage {
    public modules = new Map<string, any>()

    public nodes = new Map<string, any>()

    private name: string

    private bot: Bot

    public constructor(name: string) {
        this.name = name
    }

    public async load(): Promise<BotStorage> {
        this.bot = await botRepository()
            .findOne({
                where: {
                    name: this.name
                }
            })

        this.loadModules()
        this.loadNodes()

        return this
    }

    private loadModules(): void {
        if (this.bot.modules) {
            Object.keys(this.bot.modules)
                .filter((moduleId): boolean => this.bot.modules[moduleId]?.enabled)
                .forEach((moduleId): void => {
                    this.modules.set(moduleId, this.bot.modules[moduleId])
                })
        }
    }

    private loadNodes(): void {
        if (this.bot.metadata?.nodes) {
            Object.keys(this.bot.metadata.nodes)
                .forEach((nodeId): void => {
                    this.nodes.set(nodeId, this.bot.metadata.nodes[nodeId])
                })
        }
    }
}
