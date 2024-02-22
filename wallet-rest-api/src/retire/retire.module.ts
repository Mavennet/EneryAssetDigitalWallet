import { Module } from '@nestjs/common';
import { RetireController } from './retire.controller';
import { RetireService } from './retire.service';
import { retireProviders } from '../providers/retire.providers';
import { DatabaseModule } from '../providers/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RetireController],
  providers: [RetireService, ...retireProviders]
})
export class RetireModule {}
