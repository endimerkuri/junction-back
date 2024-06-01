import { Module } from '@nestjs/common';
import { StationsService } from './stations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Station } from './station.entity';
import { PortsModule } from 'src/ports/ports.module';

@Module({
  imports: [PortsModule, TypeOrmModule.forFeature([Station])],
  providers: [StationsService],
  exports: [StationsService],
})
export class StationsModule {}
