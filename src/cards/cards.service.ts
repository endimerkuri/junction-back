import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async create(userId: string): Promise<Card> {
    const card = new Card();
    card.userId = userId;
    await this.cardRepository.save(card);
    return card;
  }

  async update(card: Card): Promise<Card> {
    return this.cardRepository.save(card);
  }
}
