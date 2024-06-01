import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class PortParamsDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsUUID()
  stationId: string;

  @ApiProperty()
  @IsUUID()
  portId: string;
}
