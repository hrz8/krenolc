import endpoint from './endpoint'
import endpointV2 from './endpoint-v2'

import { ModuleType } from '..'

export default (): ModuleType => ({
  endpoints: [endpoint, endpointV2]
})
