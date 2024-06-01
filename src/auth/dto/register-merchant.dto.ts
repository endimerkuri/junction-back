import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RegisterUserDto } from './register-user.dto';
import { Type } from 'class-transformer';

export class RegisterMerchantInfoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}

export class RegisterMerchantDto extends RegisterUserDto {
  @ApiProperty()
  @IsDefined()
  @Type(() => RegisterMerchantInfoDto)
  merchant: RegisterMerchantInfoDto;
}
