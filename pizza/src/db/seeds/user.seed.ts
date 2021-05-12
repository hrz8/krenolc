import { UserInsertPayload } from '../entities/user.entity'

const data: UserInsertPayload[] = [
    {
        email   : 'hirzinurfakhrian@gmail.com',
        name    : 'Hirzi Nurfakhrian',
        metadata: {
            permissions: ['root'],
            roles      : ['superadmin'],
            bots       : ['system']
        }
    }
]

export default data
