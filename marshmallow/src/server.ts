import { ServiceBroker } from 'moleculer'
import dotenv from 'dotenv'

import 'tsconfig-paths/register'

import moleculerConfig from '~/moleculer.config'

dotenv.config()

const broker = new ServiceBroker(moleculerConfig)
broker.loadService('./src/web.service.js')
broker.loadServices('./src/modules', '**/*service.js')
broker.start()
