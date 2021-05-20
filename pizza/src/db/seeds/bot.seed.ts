import { BotInsertPayload } from '../entities/bot.entity'

const data: BotInsertPayload[] = [
    {
        brain   : 'preview',
        metadata: {
            modules: {
                faq: {
                    enabled: true
                },
                accessControl: {
                    enabled: true
                }
            },
            content: {
                conversation_start: {
                    content: {
                        text: 'Welcome to preview bot!'
                    }
                }
            },
            trigger: {
                conversation_start: {
                    pattern: '\u002F^hi$\u002Fi',
                    event  : 'goto',
                    data   : 'conversation_start'
                }
            }
        }
    },
    {
        brain   : 'krn',
        metadata: {
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
            },
            trigger: {
                conversation_start: {
                    pattern: '\u002F^hi$\u002Fi',
                    event  : 'goto',
                    data   : 'conversation_start'
                }
            }
        }
    }
]

export default data
