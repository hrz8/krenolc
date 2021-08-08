import Joi from 'joi'

export default {
    auth0Login: Joi.object()
        .keys({
            query : Joi.object(),
            params: Joi.object(),
            body  : Joi.object()
        }) as any
}
