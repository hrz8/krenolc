import Bot from '../entities/bot.entity'
import { UserInsertPayload } from '../entities/user.entity'

const data: UserInsertPayload[] = [
    {
        email: 'hirzinurfakhrian@gmail.com',
        name : 'Hirzi Nurfakhrian',
        bots : [
            {
                id: 'ecbcb2bc-7649-4680-be31-7918217d99fb'
            } as Bot,
            {
                id: '2712869d-5e80-47d0-b52c-ae812a56388b'
            } as Bot
        ]
    },
    {
        email: 'krenolctesi@gmail.com',
        name : 'Tesi Krenolc',
        bots : [
            {
                id: '2712869d-5e80-47d0-b52c-ae812a56388b'
            } as Bot
        ]
    }
]

export default data
