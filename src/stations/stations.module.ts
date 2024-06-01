import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './station.entity';
import { StationsController } from './stations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Station])],
  providers: [StationsService],
  exports: [StationsService],
  controllers: [StationsController],
})
export class StationsModule {}
