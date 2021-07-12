import { BotInsertPayload } from '../entities/bot.entity'

const data: BotInsertPayload[] = [
    {
        id     : 'ecbcb2bc-7649-4680-be31-7918217d99fb',
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
        id     : '2712869d-5e80-47d0-b52c-ae812a56388b',
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
