import { ServiceBroker } from 'moleculer'
import dotenv from 'dotenv'
import env from 'env-var'
import ApiGateway from 'moleculer-web'

import 'tsconfig-paths/register'

import connectDB from '@db/connection'
import WebMixin from '@/mixins/web.mixin'
import BotStorage from '@/utils/bot/storage'

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
                const webMixin = new WebMixin()
                    .init()
                const routes = await Array.from(modules.keys())
                    .reduce(async (acc, moduleId) => {
                        const endpoint = (await import(`@/modules/${moduleId}/endpoint`)).default
                        return [...acc, endpoint]
                    }, [] as any)
                broker.createService({
                    name    : 'module-service-gateway',
                    mixins  : [ApiGateway, webMixin],
                    settings: {
                        port: env.get('APP_PORT')
                            .default(3000)
                            .asString(),

                        routes: [
                            {
                                path          : '/api/auth',
                                authentication: true,
                                aliases       : {
                                    'POST login': 'auth.login'
                                }
                            },
                            ...routes
                        ],
                        log4XXResponses : false,
                        logRequestParams: null,
                        logResponseData : null
                    }
                })

                // load default services
                broker.loadServices('./src/apis', '**/*service.js')

                // load module services
                for (const [moduleId] of modules) {
                    broker.loadServices('./src/modules', `${moduleId}/service.js`)
                    broker.logger.info(`[${moduleId} Module] loaded!`)
                }
                broker.start()
            })
    })
    .catch(err => broker.logger.error(err.message))
