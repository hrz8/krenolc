import { ServiceBroker } from 'moleculer'

import 'tsconfig-paths/register'

import moleculerConfig from '~/moleculer.config'

const broker = new ServiceBroker(moleculerConfig)
broker.loadService('./src/api.service.js')
broker.loadServices('./src/modules', '**/*service.js')
broker.start()
