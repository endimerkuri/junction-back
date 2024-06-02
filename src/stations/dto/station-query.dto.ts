import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PortType } from 'src/ports/port.entity';
import { StationStatus } from '../station.entity';
import { Transform } from 'class-transformer';

export class StationQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(PortType)
  @Transform(({ value }) => ('' + value).toLowerCase())
  type: PortType;

  @ApiProperty()
  @IsOptional()
  @IsEnum(StationStatus)
  @Transform(({ value }) => ('' + value).toLowerCase())
  status: StationStatus;
}
