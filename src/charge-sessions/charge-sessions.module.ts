import { Module } from '@nestjs/common';
import { ChargeSession } from './charge-session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChargeSessionsService } from './charge-sessions.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChargeSession])],
  providers: [ChargeSessionsService],
  exports: [ChargeSessionsService],
})
export class ChargeSessionsModule {}
