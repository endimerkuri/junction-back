import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';

enum PortType {
  FAST = 'fast',
  NORMAL = 'normal',
}

export class CreatePortDto {
  @ApiProperty()
  @IsEnum(PortType)
  @Transform(({ value }) => ("" + value).toLowerCase())
  type: PortType;
}
