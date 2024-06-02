import {
  Request,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  Query,
  Body,
} from '@nestjs/common';
import { StationsService } from './stations.service';
import { normalizeResponse } from 'src/util/helpers/response.helpers';
import { Roles } from 'src/decorators/roles.decorators';
import { UserType } from 'src/users/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { PortStatus } from 'src/ports/port.entity';
import { StationStatus } from './station.entity';
import { PortsService } from 'src/ports/ports.service';
import { CardsService } from 'src/cards/cards.service';
import { StationQueryDto } from './dto/station-query.dto';
import { BookPortDto } from './dto/book-port.dto';

@Controller('stations')
export class StationsController {
  constructor(
    private stationsService: StationsService,
    private portsService: PortsService,
    private cardsService: CardsService,
  ) {}

  @Get()
  @Roles(UserType.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getStations(@Request() req, @Query() query: StationQueryDto) {
    const { user } = req;
    const stations = await this.stationsService.findAll(query);
    stations.forEach((station: any) => {
      let status = station.status;
      const ports = station.ports;
      const occupiedPorts = ports.filter(
        (port) => port.status === PortStatus.OCCUPIED,
      );
      const occupiedPortsCount = occupiedPorts.length;
      if (occupiedPortsCount === ports.length) {
        status = StationStatus.OCCUPIED;
      }
      const userOccupiedPorts = occupiedPorts.filter(
        (port) => port.occupiedBy === user.user.id,
      );

      if (userOccupiedPorts.length > 0) {
        station.isOccupiedByUser = true;
      }
      station.views = 5;
      station.status = status;
    });
    return normalizeResponse({ stations, _message: 'success' });
  }

  @Post(':id/book')
  @Roles(UserType.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async bookPort(
    @Request() req,
    @Param('id') id: string,
    @Body() payload: BookPortDto,
  ) {
    const {
      user: { user },
    } = req;
    const { id: userId, card } = user;
    const { type } = payload;
    let port = await this.portsService.findByTypeAndStationId(type, id);

    if (!port) {
      throw new NotFoundException('Port not found');
    }

    port.occupiedBy = userId;
    port = await this.portsService.update(port, {
      status: PortStatus.OCCUPIED,
    });
    card.balance -= port.bookingFee;
    await this.cardsService.update(card);
    return normalizeResponse({ port, _message: 'success' });
  }

  @Post(':id/unbook')
  @Roles(UserType.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async unbookPort(@Request() req, @Param('id') id: string) {
    const {
      user: { user },
    } = req;
    let port = await this.portsService.findByOccupiedByIdAndStationId(
      user.id,
      id,
    );

    if (!port) {
      throw new NotFoundException('Port not found');
    }

    port.occupiedBy = null;
    port = await this.portsService.update(port, {
      status: PortStatus.FREE,
    });
    return normalizeResponse({ port, _message: 'success' });
  }
}
