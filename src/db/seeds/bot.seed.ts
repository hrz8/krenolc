import { BotInsertPayload } from '../entities/bot.entity'

const data: BotInsertPayload[] = [
  {
    content: {
      modules: {
        faq: {
          enabled: true
        }
      },
      content: {
        conversation_start: {
          content: {
            text: 'Welcome to the bot!'
          }
        }
      }
    }
  }
]

export default data
