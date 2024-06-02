import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';

enum PortType {
  FAST = 'fast',
  NORMAL = 'normal',
}

export class BookPortDto {
  @ApiProperty()
  @IsEnum(PortType)
  @IsNotEmpty()
  @Transform(({ value }) => ('' + value).toLowerCase())
  type: PortType;
}
