import BotTemplate from './template'

export default class BotFactory {
    private static bots: BotTemplate[] = [];

    public static async init(): Promise<void> {
        // create system bot
        const botTemplate = new BotTemplate()
        this.bots.push(botTemplate)
    }

    public static getDefaultBot(): BotTemplate {
        return this.bots[0]
    }
}
