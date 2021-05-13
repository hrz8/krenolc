import botRepository from '~/src/db/repository/bot.repository'
import BotTemplate from './template'

export default class BotFactory {
    private static bots: Map<string, BotTemplate> = new Map<string, BotTemplate>();

    public static async init(): Promise<void> {
        // create system bot
        const botSystem = new BotTemplate()
        this.bots.set('system', botSystem)

        // load all bot from db
        const allBots = await botRepository()
            .find({
                select: ['brain']
            })
        allBots.forEach((bot: { brain: string }) => {
            const botBrain = new BotTemplate(bot.brain)
            this.bots.set(bot.brain, botBrain)
        })
    }

    public static getSystemBot(): BotTemplate {
        return this.bots.get('system') || new BotTemplate()
    }

    public static getByBrain(brain: string): BotTemplate {
        return this.bots.get(brain) as BotTemplate
    }

    public static getAll(): Map<string, BotTemplate> {
        return this.bots
    }

    public static async refresh(brain: string): Promise<void> {
        const botTemplate = new BotTemplate(brain)
        this.bots.set(brain, botTemplate)
    }
}
