import BotTemplate from './template'

export default class BotFactory {
    private static bots: Map<string, BotTemplate> = new Map<string, BotTemplate>();

    public static async init(): Promise<void> {
        // create system bot
        const botTemplate = new BotTemplate()
        this.bots.set('system', botTemplate)
    }

    public static getSystemBot(): BotTemplate {
        return this.bots.get('system') || new BotTemplate()
    }

    public static getByBrain(brain: string): BotTemplate {
        let bot = this.bots.get(brain)
        if (!bot) {
            bot = new BotTemplate(brain)
            this.bots.set(brain, bot)
        }
        return bot
    }
}
