import { Module } from '@nestjs/common';
import { PortsService } from './ports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Port } from './port.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Port])],
  providers: [PortsService],
  exports: [PortsService],
})
export class PortsModule {}
