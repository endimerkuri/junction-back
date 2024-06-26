import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
