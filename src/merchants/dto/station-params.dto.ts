import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class StationParamsDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  stationId: string;
}
