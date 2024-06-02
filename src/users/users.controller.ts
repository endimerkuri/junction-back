import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
  NotFoundException,
  ConflictException,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserType } from './user.entity';
import { Roles } from 'src/decorators/roles.decorators';
import { RolesGuard } from 'src/guards/roles.guard';
import { normalizeResponse } from 'src/util/helpers/response.helpers';
import { RechargeCardDto } from './dto/recharge-card.dto';
import { CardsService } from 'src/cards/cards.service';
import { ChargeSessionsService } from 'src/charge-sessions/charge-sessions.service';
import { PortsService } from 'src/ports/ports.service';
import { PortStatus } from 'src/ports/port.entity';

@Controller('users')
export class UsersController {
  constructor(
    private cardsService: CardsService,
    private chargeSessionsService: ChargeSessionsService,
    private portsService: PortsService,
  ) {}

  @Get('me')
  @Roles(UserType.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getMe(@Request() req) {
    const {
      user: { user },
    } = req;
    return normalizeResponse({ user, _message: 'success' });
  }

  @Post('card/recharge')
  @Roles(UserType.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async rechargeCard(@Request() req, @Body() payload: RechargeCardDto) {
    const {
      user: { user },
    } = req;
    const { card } = user;
    card.balance += payload.amount;
    await this.cardsService.update(card);
    return normalizeResponse({ user, _message: 'success' });
  }

  @Get('charge-sessions')
  @Roles(UserType.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getChargeSessions(@Request() req) {
    const {
      user: { user },
    } = req;
    const chargeSessions = await this.chargeSessionsService.findAllByUserId(
      user.id,
    );
    return normalizeResponse({ chargeSessions, _message: 'success' });
  }

  @Post('charge-sessions/start')
  @Roles(UserType.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async startCharge(@Request() req, @Body() payload: { portId: string }) {
    const {
      user: { user },
    } = req;
    const { portId } = payload;
    const port = await this.portsService.findById(portId);

    if (!port) {
      throw new NotFoundException('Port not found');
    }

    if (port.status === PortStatus.OCCUPIED && port.occupiedBy !== user.id) {
      throw new ConflictException('Port is currently occupied');
    }

    await this.portsService.update(port, {
      status: PortStatus.OCCUPIED,
      occupiedBy: user.id,
    });
    const chargeSession = await this.chargeSessionsService.create({
      userId: user.id,
      portId,
    });
    return normalizeResponse({ chargeSession, _message: 'success' });
  }

  @Post('charge-sessions/:chargeSessionId/stop')
  @Roles(UserType.CLIENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async stopCharge(
    @Request() req,
    @Param('chargeSessionId') chargeSessionId: string,
  ) {
    const {
      user: { user },
    } = req;
    const chargeSession =
      await this.chargeSessionsService.findById(chargeSessionId);

    if (!chargeSession) {
      throw new NotFoundException('Charge session not found');
    }

    if (chargeSession.userId !== user.id) {
      throw new ConflictException('Charge session does not belong to you');
    }

    const port = await this.portsService.findById(chargeSession.portId);
    await this.portsService.update(port, { status: PortStatus.FREE });
    chargeSession.endTime = new Date();
    await this.chargeSessionsService.update(chargeSession);
    return normalizeResponse({ chargeSession, _message: 'success' });
  }
}
