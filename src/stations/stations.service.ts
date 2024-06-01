import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './station.entity';
import { Repository } from 'typeorm';
import { CreateStationDto } from 'src/merchants/dto/create-station.dto';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private stationRepository: Repository<Station>,
  ) {}

  // async update(station: Station, payload: CreateStationDto): Promise<Station> {
  // }

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
    return this.stationRepository.findOneBy({ id, merchantId });
  }

  async delete(station: Station): Promise<Station> {
    return this.stationRepository.remove(station);
  }
}