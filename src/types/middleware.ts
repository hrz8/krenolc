import {
  NextFunction, Request, Response
} from 'express'
import Joi from 'joi'

import { IContext } from './action'

export interface IMiddleware {
  middleware(ctx: IContext, req: Request, res: Response, next: NextFunction) : any
}

export default interface IValidatorMiddleware extends IMiddleware {
  validate(ctx: IContext, schema: Joi.AnySchema): boolean | Error
  validator(args?: any): Joi.AnySchema
}
