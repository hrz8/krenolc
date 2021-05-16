import Permission from '../entities/permission.entity'
import Role from '../entities/role.entity'
import { UserInsertPayload } from '../entities/user.entity'

const data: UserInsertPayload[] = [
    {
        email: 'hirzinurfakhrian@gmail.com',
        name : 'Hirzi Nurfakhrian',
        roles: [
            {
                id: 'fe9a53c7-79b3-4053-82ac-b6a03881bac8'
            } as Role
        ],
        permissions: [
            {
                id: '2c4c6b4b-8b79-45f0-b975-972c89b5869b'
            } as Permission
        ],
        metadata: {
            bots: ['system']
        }
    },
    {
        email: 'hirzi@keyreply.com',
        name : 'Hirzi Keyreply',
        roles: [
            {
                id: 'd53a6e67-d3e6-49a7-88d5-58ba827712dd'
            } as Role
        ],
        metadata: {
            bots: ['preview']
        }
    }
]

export default data
