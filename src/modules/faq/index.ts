import { faqRepo } from '~/src/db/repository/'
import FaqEndpoint from './endpoint'

import { ModuleType } from '..'

export default (_options?: any): ModuleType => {
  console.log(_options)
  return {
    endpoint: new FaqEndpoint(faqRepo)
  }
}
