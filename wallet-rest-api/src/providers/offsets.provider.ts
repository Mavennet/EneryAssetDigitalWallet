import { Connection } from 'mongoose';
import { OffsetsSchema } from '../schemas/offsets.schema';

export const offsetsProviders = [
  {
    provide: 'OFFSETS_MODEL',
    useFactory: (connection: Connection) => connection.model('Offsets', OffsetsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];