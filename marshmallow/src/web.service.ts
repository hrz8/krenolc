import env from 'env-var'
import { Service, ServiceBroker } from 'moleculer'
import ApiGateway from 'moleculer-web'
import WebMixin from './mixins/web.mixin'

export default class ApiService extends Service {
    private WebMixin = new WebMixin()
        .init()

    public constructor(broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name    : 'marshmallow-gateway',
            mixins  : [ApiGateway, this.WebMixin],
            settings: {
                port: env.get('APP_PORT')
                    .default(3000)
                    .asString(),

                routes: [
                    {
                        path          : '/api/auth',
                        authentication: true,
                        aliases       : {
                            'POST login'               : 'auth.login',
                            'POST /switch-bot/:botName': 'auth.switchBot'
                        }
                    },
                    {
                        path          : '/api/restapi/:botName',
                        authentication: false,
                        aliases       : {
                            'POST ': 'restapi.chat'
                        }
                    },
                    {
                        path          : '/api/greeter',
                        authentication: true,
                        aliases       : {
                            'GET hello'  : 'greeter.hello',
                            'GET welcome': 'greeter.welcome'
                        }
                    },
                    {
                        path          : '/api/v2/greeter',
                        authentication: false,
                        aliases       : {
                            'GET hello'  : 'v2.greeter.hello',
                            'GET welcome': 'v2.greeter.welcome'
                        }
                    }
                ],
                log4XXResponses : false,
                logRequestParams: null,
                logResponseData : null
            }
        })
    }
}
