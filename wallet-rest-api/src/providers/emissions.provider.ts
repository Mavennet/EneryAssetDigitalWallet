import { Connection } from 'mongoose';
import { EmissionsSchema } from '../schemas/emissions.schema';

export const emissionsProviders = [
  {
    provide: 'EMISSIONS_MODEL',
    useFactory: (connection: Connection) => connection.model('Emissions', EmissionsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];