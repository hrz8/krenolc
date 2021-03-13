import BotTemplate from './template'

export default class BotFactory {
  private static bots: BotTemplate[] = [
  ];

  public static async init(): Promise<void> {
    const brain = process.env.BRAIN || 'KRY'
    const botTemplate = new BotTemplate(brain)
    this.bots.push(botTemplate)
  }

  public static getDefaultBot(): BotTemplate {
    return this.bots[0]
  }
}
