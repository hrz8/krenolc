import { BotInsertPayload } from '../entities/bot.entity'

const data: BotInsertPayload[] = [
    {
        id     : 'ecbcb2bc-7649-4680-be31-7918217d99fb',
        name   : 'eminem',
        modules: {
            restapi: {
                enabled : true,
                settings: {}
            }
        },
        metadata: {
            nodes: {
                conversationStart: {
                    content: {
                        text: 'Welcome to Eminem bot!'
                    }
                },
                answerName: {
                    content: {
                        text: 'My name is Slim Shady!'
                    }
                }
            },
            triggers: {
                conversationStart: {
                    pattern: '\u002F^what is your name?$\u002Fi',
                    event  : 'goto',
                    data   : 'conversationStart'
                }
            }
        }
    },
    {
        id     : '2712869d-5e80-47d0-b52c-ae812a56388b',
        name   : 'tupac',
        modules: {
            restapi: {
                enabled : true,
                settings: {}
            }
        },
        metadata: {
            nodes: {
                conversationStart: {
                    content: {
                        text: 'Welcome to Tupac bot!'
                    }
                },
                answerName: {
                    content: {
                        text: 'My name is Tupac Shakur!'
                    }
                }
            },
            triggers: {
                conversationStart: {
                    pattern: '\u002F^what is your name?$\u002Fi',
                    event  : 'goto',
                    data   : 'conversation_start'
                }
            }
        }
    }
]

export default data
