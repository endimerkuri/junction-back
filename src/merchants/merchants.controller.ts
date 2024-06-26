import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Request,
  Post,
  Param,
  Body,
  NotFoundException,
  Delete,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserType } from 'src/users/user.entity';
import { normalizeResponse } from 'src/util/helpers/response.helpers';
import { ValidMerchantInterceptor } from './interceptors/valid-merchant.interceptor';
import { StationsService } from 'src/stations/stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { StationParamsDto } from './dto/station-params.dto';
import { PortsService } from 'src/ports/ports.service';
import { CreatePortDto } from './dto/create-port.dto';
import { PortParamsDto } from './dto/port-params.dto';

@Controller('merchants')
export class MerchantsController {
  constructor(
    private stationsService: StationsService,
    private portsService: PortsService,
  ) {}

  @Get(':id/me')
  @Roles(UserType.MERCHANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ValidMerchantInterceptor)
  async get(@Request() req) {
    return normalizeResponse({ merchant: req.merchant, _message: 'success' });
  }

  @Get(':id/dashboard')
  @Roles(UserType.MERCHANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ValidMerchantInterceptor)
  async get(@Request() req) {
    return normalizeResponse({ merchant: req.merchant, _message: 'success' });
  }

  @Get(':id/stations')
  @Roles(UserType.MERCHANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ValidMerchantInterceptor)
  async getStations(@Request() req) {
    const stations = await this.stationsService.findByMerchantId(
      req.merchant.id,
    );
    return normalizeResponse({ stations, _message: 'success' });
  }

  @Post(':id/stations')
  @Roles(UserType.MERCHANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ValidMerchantInterceptor)
  async createStation(
    @Request() req,
    @Param('id') merchantId: string,
    @Body() payload: CreateStationDto,
  ) {
    const station = await this.stationsService.create(merchantId, payload);
    return normalizeResponse({ station, _message: 'success' });
  }

  @Get(':id/stations/:stationId')
  @Roles(UserType.MERCHANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ValidMerchantInterceptor)
  async getStation(@Request() req, @Param() params: StationParamsDto) {
    const { id, stationId } = params;
    const station = await this.stationsService.findByIdAndMerchantId(
      stationId,
      id,
    );

    if (!station) {
      throw new NotFoundException('Station not found');
    }
    return normalizeResponse({ station, _message: 'success' });
  }

  @Put(':id/stations/:stationId')
  @Roles(UserType.MERCHANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ValidMerchantInterceptor)
  async updateStation(
    @Request() req,
    @Param() params: StationParamsDto,
    @Body() payload: Partial<CreateStationDto>,
  ) {
    const { id, stationId } = params;
    const station = await this.stationsService.findByIdAndMerchantId(
      stationId,
      id,
    );

    if (!station) {
      throw new NotFoundException('Station not found');
    }

    const updatedStation = await this.stationsService.update(station, payload);
    return normalizeResponse({ station: updatedStation, _message: 'success' });
  }

  @Delete(':id/stations/:stationId')
  @Roles(UserType.MERCHANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ValidMerchantInterceptor)
  async deleteStation(@Request() req, @Param() params: StationParamsDto) {
    const { id, stationId } = params;
    const station = await this.stationsService.findByIdAndMerchantId(
      stationId,
      id,
    );

    if (!station) {
      throw new NotFoundException('Station not found');
    }

    await this.stationsService.delete(station);
    return normalizeResponse({ _message: 'success' });
  }

  @Post(':id/stations/:stationId/ports')
  @Roles(UserType.MERCHANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ValidMerchantInterceptor)
  async createPort(
    @Request() req,
    @Param() params: StationParamsDto,
    @Body() payload: CreatePortDto,
  ) {
    const { id, stationId } = params;
    const station = await this.stationsService.findByIdAndMerchantId(
      stationId,
      id,
    );

    if (!station) {
      throw new NotFoundException('Station not found');
    }

    const port = await this.portsService.create(stationId, payload);
    return normalizeResponse({ port, _message: 'success' });
  }

  @Put(':id/stations/:stationId/ports/:portId')
  @Roles(UserType.MERCHANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ValidMerchantInterceptor)
  async updatePort(
    @Request() req,
    @Param() params: PortParamsDto,
    @Body() payload: Partial<CreatePortDto>,
  ) {
    const { id, stationId, portId } = params;
    const station = await this.stationsService.findByIdAndMerchantId(
      stationId,
      id,
    );

    if (!station) {
      throw new NotFoundException('Station not found');
    }

    const port = station.ports.find((port) => port.id === portId);

    if (!port) {
      throw new NotFoundException('Port not found');
    }

    await this.portsService.update(port, payload);
    return normalizeResponse({ port, _message: 'success' });
  }

  @Delete(':id/stations/:stationId/ports/:portId')
  @Roles(UserType.MERCHANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ValidMerchantInterceptor)
  async deletePort(@Request() req, @Param() params: PortParamsDto) {
    const { id, stationId, portId } = params;
    const station = await this.stationsService.findByIdAndMerchantId(
      stationId,
      id,
    );

    if (!station) {
      throw new NotFoundException('Station not found');
    }

    const port = station.ports.find((port) => port.id === portId);

    if (!port) {
      throw new NotFoundException('Port not found');
    }

    await this.portsService.delete(port);
    return normalizeResponse({ port, _message: 'success' });
  }
}
