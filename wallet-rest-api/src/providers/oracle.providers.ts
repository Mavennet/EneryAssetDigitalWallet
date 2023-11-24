import { Connection } from 'mongoose';
import { OracleSchema } from '../schemas/oracle.schema';

export const oracleProviders = [
  {
    provide: 'ORACLE_MODEL',
    useFactory: (connection: Connection) => connection.model('Oracle', OracleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];