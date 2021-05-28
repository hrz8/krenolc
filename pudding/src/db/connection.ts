import env from 'env-var'
import { connect } from 'mongoose'

export default () : Promise<any> => connect(`mongodb://${env.get('DB_SERVER')
    .required()
    .asString()}:${env.get('DB_PORT')
    .required()
    .asString()}/${env.get('DB_NAME')
    .required()
    .asString()}`, {
    useNewUrlParser   : true,
    useUnifiedTopology: true
})
