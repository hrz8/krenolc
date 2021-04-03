import { Endpoint } from '../types/endpoint'
import faq from './faq'

export type ModuleType = Readonly<{
  endpoints: Endpoint[]
}>

const modules: {[moduleId: string]: () => ModuleType} = {
  faq
}

export default modules
