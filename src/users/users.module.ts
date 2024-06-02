import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CardsModule } from 'src/cards/cards.module';
import { PortsModule } from 'src/ports/ports.module';
import { ChargeSessionsModule } from 'src/charge-sessions/charge-sessions.module';

@Module({
  imports: [
    CardsModule,
    PortsModule,
    ChargeSessionsModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
