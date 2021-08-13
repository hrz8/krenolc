import { Service, ServiceBroker } from 'moleculer'

import userValidator from './validator'

export default class UserService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name   : 'web-user',
            actions: {
                list: {
                    params : userValidator.list,
                    handler: async (ctx): Promise<string> => 'user list'
                }
            }
        })
    }
}
