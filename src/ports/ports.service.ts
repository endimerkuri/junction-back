import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Port } from './port.entity';
import { Repository } from 'typeorm';
import { CreatePortDto } from 'src/merchants/dto/create-port.dto';

@Injectable()
export class PortsService {
  constructor(
    @InjectRepository(Port)
    private portRepository: Repository<Port>,
  ) {}

  async create(stationId: string, payload: CreatePortDto): Promise<Port> {
    const port = new Port();
    port.type = payload.type;
    port.stationId = stationId;
    return this.portRepository.save(port);
  }
}
