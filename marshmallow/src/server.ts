import { ServiceBroker } from 'moleculer'

import moleculerConfig from '../moleculer.config'

const broker = new ServiceBroker(moleculerConfig)
broker.loadService('./src/api.service.js')
broker.loadServices('./src/modules', '**/*service.js')
broker.start()
