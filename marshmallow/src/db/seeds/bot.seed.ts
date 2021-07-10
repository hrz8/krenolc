import { BotInsertPayload } from '../entities/bot.entity'

const data: BotInsertPayload[] = [
    {
        name   : 'hirzi-bot',
        modules: {
            restapi: {
                enabled : true,
                settings: {}
            }
        },
        metadata: {
            node: {
                conversationStart: {
                    content: {
                        text: 'Welcome to hirzi bot!'
                    }
                }
            },
            trigger: {
                conversationStart: {
                    pattern: '\u002F^hi$\u002Fi',
                    event  : 'goto',
                    data   : 'conversationStart'
                }
            }
        }
    },
    {
        name   : 'anyone-bot',
        modules: {
            restapi: {
                enabled : true,
                settings: {}
            }
        },
        metadata: {
            node: {
                conversationStart: {
                    content: {
                        text: 'Welcome to your bot!'
                    }
                }
            },
            trigger: {
                conversationStart: {
                    pattern: '\u002F^hi$\u002Fi',
                    event  : 'goto',
                    data   : 'conversation_start'
                }
            }
        }
    }
]

export default data
