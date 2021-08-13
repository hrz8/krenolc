import Joi from 'joi'

export default {
    provider: Joi.object()
        .keys({
            query : Joi.object(),
            params: Joi.object(),
            body  : Joi.object()
        }) as any,
    loginAuth0: Joi.object()
        .keys({
            query : Joi.object(),
            params: Joi.object(),
            body  : Joi.object()
        }) as any,
    loginKeycloak: Joi.object()
        .keys({
            query : Joi.object(),
            params: Joi.object(),
            body  : Joi.object()
        }) as any
}
