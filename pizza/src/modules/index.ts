import { ModuleType } from '@/types/module'

import accessControl from './accessControl'
import faq from './faq'

const modules: { [moduleId: string]: () => ModuleType } = {
    accessControl,
    faq
}

export default modules
