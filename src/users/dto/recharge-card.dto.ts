import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class RechargeCardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
