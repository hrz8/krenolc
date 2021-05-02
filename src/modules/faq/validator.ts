import Joi from 'joi'
import { EndpointValidatorSchema } from '~/src/types/endpoint'

const validators = {
    getAll(): Joi.ObjectSchema {
        return Joi.object<EndpointValidatorSchema>({
            params: Joi.object(),
            query : Joi.object(),
            body  : Joi.object()
                .keys({
                    kamu: Joi.string()
                        .required()
                }),
            headers: Joi.object()
        })
    }
}

export default validators
