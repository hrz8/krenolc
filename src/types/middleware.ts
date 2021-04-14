import {
  NextFunction, Request, Response
} from 'express'
import Joi from 'joi'
import { Context } from './action'

export interface IMiddleware {
  middleware(ctx: Context, req: Request, res: Response, next: NextFunction) : any
}

export default interface IValidatorMiddleware extends IMiddleware {
  validate(ctx: Context, schema: Joi.AnySchema): boolean | Error
  validator(args?: any): Joi.AnySchema
}
