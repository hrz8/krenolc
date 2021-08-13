import Joi from 'joi'

export default {
    list: Joi.object()
        .keys({
            query : Joi.object(),
            params: Joi.object(),
            body  : Joi.object()
        }) as any
}
