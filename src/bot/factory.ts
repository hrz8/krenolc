export default class BotFactory {
  public static async init(): Promise<void> {
    const brain = process.env.BRAIN
    if (brain) {
      console.log('brain')
    }
  }

  public static getDefaultBot(): any {
    return {}
  }
}
