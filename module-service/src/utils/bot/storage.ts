import botRepository from '@/db/repository/bot.repository'
import Bot from '~/src/db/entities/bot.entity'

export default class BotStorage {
    public modules = new Map<string, any>()

    private name: string

    public constructor(name: string) {
        this.name = name
    }

    public async load(): Promise<Bot> {
        const bot = await botRepository()
            .findOne({
                where: {
                    name: this.name
                }
            })
        Object.keys(bot.modules)
            .filter((moduleId): boolean => bot.modules[moduleId]?.enabled)
            .forEach((moduleId): void => {
                this.modules.set(moduleId, bot.modules[moduleId])
            })
        return bot
    }
}
