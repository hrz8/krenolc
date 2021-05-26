import { ModuleType } from '@/types/module'

import endpoint from './endpoint'

export default (): ModuleType => ({
    endpoints: [endpoint]
})
