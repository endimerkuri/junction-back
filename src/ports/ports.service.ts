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

  async findByIdAndStationId(id: string, stationId: string): Promise<Port> {
    return this.portRepository.findOne({ where: { id, stationId } });
  }

  async delete(port: Port): Promise<Port> {
    return this.portRepository.remove(port);
  }

  async create(stationId: string, payload: CreatePortDto): Promise<Port> {
    const port = new Port();
    port.type = payload.type;
    port.stationId = stationId;
    port.price = payload.price;
    port.dynamicPrice = payload.dynamicPrice;
    port.requests = payload.requests;
    port.bookingFee = payload.bookingFee;
    return this.portRepository.save(port);
  }

  async update(port: Port, payload: Partial<CreatePortDto>): Promise<Port> {
    port.type = payload.type ?? port.type;
    port.price = payload.price ?? port.price;
    port.dynamicPrice = payload.dynamicPrice ?? port.dynamicPrice;
    port.requests = payload.requests ?? port.requests;
    port.status = payload.status ?? port.status;
    port.bookingFee = payload.bookingFee ?? port.bookingFee;
    return this.portRepository.save(port);
  }
}
