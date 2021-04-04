import Joi from 'joi'
import { EndpointValidatorCollection } from '~/src/types/endpoint'

const validators: EndpointValidatorCollection = {
  getAll: () => Joi.object({
    query  : Joi.object(),
    body   : Joi.object(),
    headers: Joi.object()
  })
}

export default validators
