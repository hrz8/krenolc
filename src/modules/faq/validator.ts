import Joi from 'joi'

import { EndpointValidatorCollection } from '@/types/endpoint'

const validators: EndpointValidatorCollection = {
  getAll: () => Joi.object({
    params : Joi.object(),
    query  : Joi.object(),
    body   : Joi.object(),
    headers: Joi.object()
  })
}

export default validators
