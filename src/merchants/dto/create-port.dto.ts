import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

enum PortStatus {
  FREE = 'free',
  OCCUPIED = 'occupied',
  NOT_AVAILABLE = 'not_available',
}

enum PortType {
  FAST = 'fast',
  NORMAL = 'normal',
}

export class CreatePortDto {
  @ApiProperty()
  @IsEnum(PortType)
  @Transform(({ value }) => ('' + value).toLowerCase())
  type: PortType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  dynamicPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  requests: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PortStatus)
  @Transform(({ value }) => ('' + value).toLowerCase())
  status: PortStatus;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  bookingFee: number;
}
