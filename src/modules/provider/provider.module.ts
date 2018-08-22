import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { ProviderSummaryTopDRG } from '../provider/provider-summary-top-drg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProviderSummaryTopDRG])],
  controllers: [ProviderController],
  providers: [ProviderService],
  exports: [ProviderService],
})
export class ProviderModule {}
