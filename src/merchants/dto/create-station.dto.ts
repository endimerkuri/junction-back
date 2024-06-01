import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsString } from 'class-validator';

enum StationStatus {
  ACTIVE = 'active',
  OUT_OF_ORDER = 'out_of_order',
}

export class CreateStationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsLatitude()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty()
  @IsLongitude()
  @IsNotEmpty()
  longitude: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(StationStatus)
  status: StationStatus;
}
