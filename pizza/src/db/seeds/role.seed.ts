import Permission from '../entities/permission.entity'
import { RoleInserPayload } from '../entities/role.entity'
import permissionRepository from '../repository/permission.repository'

const getRootPermission = async () => {
    const permission = await permissionRepository()
        .findOne({
            where: {
                id: '2c4c6b4b-8b79-45f0-b975-972c89b5869b'
            }
        })
    if (!permission) {
        return null
    }
    return permission
}

export default async (): Promise<RoleInserPayload[]> => [
    {
        name       : 'root',
        description: 'super user access',
        permissions: [await getRootPermission() as Permission]
    }
]
