import { PermissionInserPayload } from '../entities/permission.entity'

const data: PermissionInserPayload[] = [
    {
        id         : '2c4c6b4b-8b79-45f0-b975-972c89b5869b',
        name       : 'root',
        description: 'super user access'
    },
    {
        id         : '932ca262-198c-4991-bca5-974d3b93c4d2',
        name       : 'getAll@faq',
        description: 'get all faq data'
    },
    {
        id         : 'b5ba6d92-8fac-4842-9d60-f03c43f3dc65',
        name       : 'getDefault@faq',
        description: 'get default faq data'
    }
]

export default data
