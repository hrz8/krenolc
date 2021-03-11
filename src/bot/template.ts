import log from '../utils/logger'

export default class BotTemplate {
  public brain = ''

  public modules = new Map<string, any>();

  public endpoint = new Map<string, any>();

  public constructor(brain: string) {
    this.brain = brain
    this.load(brain)
  }

  public load(brain: string): void {
    log.info(`Loading ${brain} bot`)
    this.modules.clear()
  }
}
