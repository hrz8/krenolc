import Permission from '../entities/permission.entity'
import { RoleInserPayload } from '../entities/role.entity'

const data: RoleInserPayload[] = [
    {
        name       : 'superadmin',
        description: 'super admin with root access as super user',
        permissions: [
            {
                id: '2c4c6b4b-8b79-45f0-b975-972c89b5869b'
            } as Permission
        ]
    }
]

export default data
