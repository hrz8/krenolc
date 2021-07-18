import { writable } from 'svelte/store'

export const usedBot = writable(null)
export const allBots = writable([])

export class Bot {
  public static async load(
    { bots, default: defaultBot }:
    { bots: string[]; default: any }): Promise<void>
  {
    usedBot.set(defaultBot)
    allBots.set(bots)
  }
}
