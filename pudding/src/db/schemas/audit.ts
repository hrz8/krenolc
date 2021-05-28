import { Schema } from 'mongoose'

const AuditSchema: Schema = new Schema({
    documentable: {
        type    : String,
        required: true
    },
    documentableId: {
        type    : String,
        required: true
    },
    payload: {
        type    : String,
        required: true
    }
}, {
    timestamps: true
})

export default AuditSchema
