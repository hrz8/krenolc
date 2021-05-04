import { BRAIN_DEFAULT } from '@/libs/constant'
import EnvFactory from '../env'
import BotTemplate from './template'

export default class BotFactory {
    private static bots: BotTemplate[] = [];

    public static async init(): Promise<void> {
        const brain = EnvFactory.get<string>('BRAIN', BRAIN_DEFAULT)
        const botTemplate = new BotTemplate(brain as string)
        this.bots.push(botTemplate)
    }

    public static getDefaultBot(): BotTemplate {
        return this.bots[0]
    }
}
