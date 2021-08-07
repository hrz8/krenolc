import { Service, ServiceBroker } from 'moleculer'

export default class UserService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name   : 'user',
            actions: {
                list: {
                    rest: {
                        method: 'GET',
                        path  : '/'
                    },
                    handler: async (ctx): Promise<string> => 'user list'
                }
            }
        })
    }
}
