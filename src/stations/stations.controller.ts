import { Controller, Get, UseGuards } from '@nestjs/common';
import { StationsService } from './stations.service';
import { normalizeResponse } from 'src/util/helpers/response.helpers';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/users/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { PortStatus } from 'src/ports/port.entity';
import { StationStatus } from './station.entity';

@Controller('stations')
export class StationsController {
  constructor(
    private stationsService: StationsService,
  ) {}

  @Get()
  @Roles(UserType.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getStations() {
    const stations = await this.stationsService.findAll();
    stations.forEach((station) => {
      let status = station.status;
      const ports = station.ports;
      const occupiedPorts = ports.filter((port) => port.status === PortStatus.OCCUPIED);
      const occupiedPortsCount = occupiedPorts.length;
      if (occupiedPortsCount === ports.length) {
        status = StationStatus.OCCUPIED;
      }
      station.status = status;
    });
    return normalizeResponse({ stations, _message: 'success' });
  }
}
