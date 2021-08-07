import { Connection, createConnection } from 'typeorm'

import ormconfig from '~/ormconfig'

export default (): Promise<Connection> => createConnection(ormconfig)
