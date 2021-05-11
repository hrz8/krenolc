import { BotInsertPayload } from '../entities/bot.entity'

const data: BotInsertPayload[] = [
    {
        brain  : 'preview',
        content: {
            modules: {
                faq: {
                    enabled: true
                }
            },
            content: {
                conversation_start: {
                    content: {
                        text: 'Welcome to preview bot!'
                    }
                }
            }
        }
    },
    {
        brain  : 'krn',
        content: {
            modules: {
                faq: {
                    enabled: true
                }
            },
            content: {
                conversation_start: {
                    content: {
                        text: 'Welcome to your custom bot!'
                    }
                }
            }
        }
    }
]

export default data
