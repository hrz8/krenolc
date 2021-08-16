import Bot from '@/db/entities/bot.entity'
import botRepository from '@/db/repository/bot.repository'

export default class BotStorage {
    public modules = new Map<string, any>()

    public nodes = new Map<string, any>()

    public triggers = new Map<string, any>()

    private name: string

    private botRaw: Bot

    public constructor(name: string) {
        this.name = name
    }

    public async load(): Promise<BotStorage> {
        this.botRaw = await botRepository()
            .findOne({
                where: {
                    name: this.name
                }
            })

        this.loadModules()
        this.loadNodes()
        this.loadTriggers()

        return this
    }

    private loadModules(): void {
        if (this.botRaw.modules) {
            Object.keys(this.botRaw.modules)
                .filter((moduleId): boolean => this.botRaw.modules[moduleId]?.enabled)
                .forEach((moduleId): void => {
                    this.modules.set(moduleId, this.botRaw.modules[moduleId])
                })
        }
    }

    private loadNodes(): void {
        if (this.botRaw.metadata?.nodes) {
            Object.keys(this.botRaw.metadata.nodes)
                .forEach((nodeId): void => {
                    this.nodes.set(nodeId, this.botRaw.metadata.nodes[nodeId])
                })
        }
    }

    private loadTriggers(): void {
        if (this.botRaw.metadata?.triggers) {
            Object.keys(this.botRaw.metadata.triggers)
                .forEach((triggerId): void => {
                    this.triggers.set(triggerId, this.botRaw.metadata.triggers[triggerId])
                })
        }
    }
}
