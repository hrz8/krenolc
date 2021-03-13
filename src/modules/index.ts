import faq from './faq'

export type ModuleType = Readonly<{
  endpoint?: any
}>;

const modules: {[moduleId: string]: () => ModuleType} = {
  faq
}

export default modules
