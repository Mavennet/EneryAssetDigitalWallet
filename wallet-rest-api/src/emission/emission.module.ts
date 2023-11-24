import { Module } from '@nestjs/common';
import { EmissionController } from './emission.controller';
import { EmissionService } from './emission.service';
import { emissionsProviders } from '../providers/emissions.provider';
import { DatabaseModule } from '../providers/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EmissionController],
  providers: [EmissionService, ...emissionsProviders]
})
export class EmissionModule {}
