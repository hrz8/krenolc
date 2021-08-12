import { Service, ServiceSchema } from 'moleculer'
import { Response, SuccessResponse } from '@/utils/responses/success'

type MixinSchema = Partial<ServiceSchema> & ThisType<Service>

export default class CommonMixin implements Partial<ServiceSchema>, ThisType<Service> {
    private schema: MixinSchema;

    public constructor() {
        this.schema = {
            hooks: {
                after: {
                    '*': (ctx, res: Response): SuccessResponse => {
                        const serviceName = ctx.service.name
                        const actionName = ctx.action.rawName
                        const version = ctx.service.version || 1
                        const { responseMessage } = ctx.action
                        return new SuccessResponse(
                            res.data,
                            res.meta,
                            {
                                responseMessage: responseMessage || `success ${actionName} ${serviceName}`,
                                apiVersion     : `v${version}`
                            }
                        )
                    }
                }
            }
        }
    }

    public init(): MixinSchema {
        return this.schema
    }
}
