import { ServiceBroker } from 'moleculer'
import dotenv from 'dotenv'
import env from 'env-var'

import 'tsconfig-paths/register'

import connectDB from '@db/connection'
import BotStorage from '@/utils/bot/storage'
import WebService from '@/services/web/web.service'

import moleculerConfig from '~/moleculer.config'

dotenv.config()

const broker = new ServiceBroker(moleculerConfig)

connectDB()
    .then(async () => {
        // db connected
        broker.logger.info('Database connected successfully')

        // load the bot with given bot name
        const botName = env.get('BOT_NAME')
            .required()
            .asString()
        const botStorage = new BotStorage(botName)
        broker.logger.info(`[${botName} Bot] loading...`)
        botStorage.load()
            .then(async loadedBot => {
                // bot loaded, inject then
                const { modules } = loadedBot
                broker.logger.info(`[${botName} Bot] load process completed!`)
                broker.bot = loadedBot

                // create web api gateway service
                const moduleRoutes = await Array.from(modules.keys())
                    .reduce(async (acc, moduleId) => {
                        const moduleEndpoint = (await import(`@/modules/${moduleId}/endpoint`)).default
                        return [...acc, ...moduleEndpoint]
                    }, [] as any)
                const webService = await WebService(moduleRoutes)
                broker.createService(webService)

                // create apollo api gateway service

                // load default services
                broker.loadServices('./src/web', '**/*service.js')
                broker.loadServices('./src/apollo', '**/*service.js')

                // load module services
                for (const [moduleId] of modules) {
                    broker.loadServices('./src/modules', `${moduleId}/service.js`)
                    broker.logger.info(`[${moduleId} Module] loaded!`)
                }
                broker.start()
            })
    })
    .catch(err => broker.logger.error(err.message))
