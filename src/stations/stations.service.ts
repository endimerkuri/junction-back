import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './station.entity';
import { Repository } from 'typeorm';
import { CreateStationDto } from 'src/merchants/dto/create-station.dto';
import { StationQueryDto } from './dto/station-query.dto';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) {}

  async findAll(query: StationQueryDto): Promise<Station[]> {
    const where: any = {};
    if (query.status) {
      where.status = query.status;
    }
    if (query.type) {
      where.ports = { type: query.type };
    }
    if (query.qs) {
      where.name = query.qs;
    }
    return this.stationRepository.find({
      where,
      relations: ['merchant', 'ports'],
    });
  }

  async update(
    station: Station,
    payload: Partial<CreateStationDto>,
  ): Promise<Station> {
    station.name = payload.name ?? station.name;
    station.latitude = payload.latitude ?? station.latitude;
    station.longitude = payload.longitude ?? station.longitude;
    station.address = payload.address ?? station.address;
    station.status = payload.status ?? station.status;
    return this.stationRepository.save(station);
  }

  async create(
    merchantId: string,
    payload: CreateStationDto,
  ): Promise<Station> {
    return this.stationRepository.save({ ...payload, merchantId });
  }

  async findByMerchantId(merchantId: string): Promise<Station[]> {
    return this.stationRepository.findBy({ merchantId });
  }

  async findByIdAndMerchantId(
    id: string,
    merchantId: string,
  ): Promise<Station> {
    return this.stationRepository.findOne({
      where: { id, merchantId },
      relations: ['ports'],
    });
  }

  async delete(station: Station): Promise<Station> {
    return this.stationRepository.remove(station);
  }
}
