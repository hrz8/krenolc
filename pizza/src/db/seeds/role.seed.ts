import Permission from '../entities/permission.entity'
import { RoleInserPayload } from '../entities/role.entity'

const data: RoleInserPayload[] = [
    {
        id         : 'fe9a53c7-79b3-4053-82ac-b6a03881bac8',
        name       : 'superadmin',
        description: 'super admin with root access as super user',
        permissions: [
            {
                id: '2c4c6b4b-8b79-45f0-b975-972c89b5869b'
            } as Permission
        ]
    },
    {
        id         : 'd53a6e67-d3e6-49a7-88d5-58ba827712dd',
        name       : 'user',
        description: 'just a user ☹️',
        permissions: [
            {
                id: '932ca262-198c-4991-bca5-974d3b93c4d2'
            } as Permission,
            {
                id: 'b5ba6d92-8fac-4842-9d60-f03c43f3dc65'
            } as Permission
        ]
    }
]

export default data
