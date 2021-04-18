import { ModuleType } from '@/types/module'

import endpoint from './endpoint'
import endpointV2 from './endpoint-v2'

export default (): ModuleType => ({
  endpoints: [endpoint, endpointV2]
})
