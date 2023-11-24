import { Module } from '@nestjs/common';
import { OracleController } from './oracle.controller';
import { OracleService } from './oracle.service';
import { oracleProviders } from '../providers/oracle.providers';
import { DatabaseModule } from '../providers/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OracleController],
  providers: [OracleService, ...oracleProviders]
})
export class OracleModule {}
