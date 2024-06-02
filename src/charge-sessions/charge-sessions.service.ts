import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChargeSession } from './charge-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChargeSessionsService {
  constructor(
    @InjectRepository(ChargeSession)
    private chargeSessionRepository: Repository<ChargeSession>,
  ) {}

  async findById(id: string): Promise<ChargeSession> {
    return this.chargeSessionRepository.findOne({ where: { id } });
  }

  async update(chargeSession: ChargeSession): Promise<ChargeSession> {
    return this.chargeSessionRepository.save(chargeSession);
  }

  async findAllByUserId(userId: string): Promise<ChargeSession[]> {
    return this.chargeSessionRepository.find({ where: { userId } });
  }

  async create(payload: {
    userId: string;
    portId: string;
  }): Promise<ChargeSession> {
    const chargeSession = new ChargeSession();
    chargeSession.portId = payload.portId;
    chargeSession.userId = payload.userId;
    chargeSession.startTime = new Date();
    return this.chargeSessionRepository.save(chargeSession);
  }
}
