import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { PortType } from "src/ports/port.entity";

export class CreatePortDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PortType)
  type: PortType;
}
