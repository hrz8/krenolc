import Joi from 'joi'

export default {
    chat: Joi.object()
        .keys({
            query : Joi.object(),
            params: Joi.object(),
            body  : Joi.object()
                .keys({
                    foo: Joi.string()
                        .required()
                })
        }) as any
}
