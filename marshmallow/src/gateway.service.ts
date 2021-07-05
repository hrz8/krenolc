import env from 'env-var'
import { Service, ServiceBroker } from 'moleculer'
import ApiGateway from 'moleculer-web'
import AuthMixin from './mixins/auth.mixin'

export default class ApiService extends Service {
    private AuthMixin = new AuthMixin()
        .init()

    public constructor(broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name    : 'api',
            mixins  : [ApiGateway, this.AuthMixin],
            settings: {
                port: env.get('APP_PORT')
                    .default(3000)
                    .asString(),

                routes: [
                    {
                        path          : '/api',
                        whitelist     : ['**'],
                        use           : [],
                        mergeParams   : false,
                        authentication: false,
                        authorization : false,
                        autoAliases   : true,
                        aliases       : {},
                        callingOptions: {},
                        bodyParsers   : {
                            json: {
                                strict: false,
                                limit : '1MB'
                            },
                            urlencoded: {
                                extended: true,
                                limit   : '1MB'
                            }
                        },
                        mappingPolicy: 'all',
                        logging      : true
                    }
                ],
                log4XXResponses : false,
                logRequestParams: null,
                logResponseData : null,
                assets          : {
                    folder : 'public',
                    options: {}
                }
            }
        })
    }
}
