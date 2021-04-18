import { ModuleType } from '@/types/module'

import faq from './faq'

const modules: {[moduleId: string]: () => ModuleType} = {
  faq
}

export default modules
