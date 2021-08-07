import {
    Validator as BaseValidator, Errors, GenericObject
} from 'moleculer'

export default class JoiValidator extends BaseValidator {
    public compile(schema: GenericObject): Function {
        return (params: any): boolean => this.validate(params, schema)
    }

    public validate(params: GenericObject, schema: GenericObject): boolean {
        const res = schema.validate(params)
        if (res.error) {
            throw new Errors.ValidationError(res.error.message, null, res.error.details)
        }

        return true
    }
}
