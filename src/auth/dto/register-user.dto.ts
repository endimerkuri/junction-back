import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserType } from 'src/users/user.entity';

export class RegisterUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserType)
  @IsNotIn([UserType.ADMIN])
  @IsOptional()
  @ApiProperty({ enum: UserType, default: UserType.CLIENT })
  userType: UserType = UserType.CLIENT;
}
