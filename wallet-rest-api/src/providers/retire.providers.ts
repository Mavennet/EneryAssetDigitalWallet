import { Connection } from 'mongoose';
import { RetireSchema } from '../schemas/retire.schema';

export const retireProviders = [
  {
    provide: 'RETIRE_MODEL',
    useFactory: (connection: Connection) => connection.model('Retire', RetireSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];