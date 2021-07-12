import { ServiceBroker } from 'moleculer'
import dotenv from 'dotenv'

import 'tsconfig-paths/register'

import connectDB from '@db/connection'
import moleculerConfig from '~/moleculer.config'

dotenv.config()

const broker = new ServiceBroker(moleculerConfig)
broker.loadService('./src/web.service.js')
broker.loadServices('./src/apis', '**/*service.js')
broker.loadServices('./src/modules', '**/*service.js')
broker.start()
    .then(async () => {
        await connectDB()
            .then(() => broker.logger.info('Database connected successfully'))
            .catch(err => broker.logger.error(err.message))
    })
