import { Module } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from './merchant.entity';
import { UsersModule } from 'src/users/users.module';
import { MerchantsController } from './merchants.controller';
import { StationsModule } from 'src/stations/stations.module';
import { PortsModule } from 'src/ports/ports.module';

@Module({
  imports: [TypeOrmModule.forFeature([Merchant]), UsersModule, StationsModule, PortsModule],
  providers: [MerchantsService],
  exports: [MerchantsService],
  controllers: [MerchantsController],
})
export class MerchantsModule {}
