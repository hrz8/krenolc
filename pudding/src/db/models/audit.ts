import {
    model, Model, Document
} from 'mongoose'
import AuditSchema from '../schemas/audit'

interface IAudit extends Document {
    documentable: string;
    documentableId: string;
    payload: string;
  }

const AuditModel: Model<IAudit> = model('Audit', AuditSchema)

export default AuditModel
