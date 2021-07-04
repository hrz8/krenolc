import { Service, ServiceBroker } from 'moleculer'
import ApiGateway from 'moleculer-web'

export default class ApiService extends Service {
    public constructor(broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name    : 'api',
            mixins  : [ApiGateway],
            settings: {
                port: process.env.PORT || 3000,

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
            },

            methods: {}
        })
    }
}
