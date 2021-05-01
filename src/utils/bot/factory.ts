import { getEnv } from '../env'
import BotTemplate from './template'

export default class BotFactory {
  private static bots: BotTemplate[] = [];

  public static async init(): Promise<void> {
    const brain = getEnv<string>('BRAIN', 'KRY')
    const botTemplate = new BotTemplate(brain as string)
    this.bots.push(botTemplate)
  }

  public static getDefaultBot(): BotTemplate {
    return this.bots[0]
  }
}
