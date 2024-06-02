import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserType } from './user.entity';
import { Roles } from 'src/decorators/roles.decorators';
import { RolesGuard } from 'src/guards/roles.guard';
import { normalizeResponse } from 'src/util/helpers/response.helpers';
import { RechargeCardDto } from './dto/recharge-card.dto';
import { CardsService } from 'src/cards/cards.service';

@Controller('users')
export class UsersController {
  constructor(private cardService: CardsService) {}

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
    await this.cardService.update(card);
    return normalizeResponse({ user, _message: 'success' });
  }
}
