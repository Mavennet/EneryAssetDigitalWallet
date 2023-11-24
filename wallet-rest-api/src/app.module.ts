import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmissionModule } from './emission/emission.module';
import { WalletModule } from './wallet/wallet.module';
import { SettingsModule } from './settings/settings.module';
import { RetireModule } from './retire/retire.module';
import { OracleModule } from './oracle/oracle.module';

@Module({
  imports: [EmissionModule, WalletModule, SettingsModule, RetireModule, OracleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
