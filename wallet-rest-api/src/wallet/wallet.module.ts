import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { offsetsProviders } from '../providers/offsets.provider';
import { DatabaseModule } from '../providers/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [WalletController],
  providers: [WalletService, ...offsetsProviders],
})
export class WalletModule {}
