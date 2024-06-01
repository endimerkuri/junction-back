import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { TokensService } from 'src/tokens/tokens.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Token } from 'src/tokens/token.entity';
import { RegisterMerchantDto } from './dto/register-merchant.dto';
import { MerchantsService } from 'src/merchants/merchants.service';
import { UserType } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
    private merchantsService: MerchantsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    const correctPassword = await bcrypt.compare(pass, user.password);
    if (!correctPassword) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const { id, token } = await this.tokensService.create(user.id);
    const merchant = await this.merchantsService.findByUserId(user.id);
    const payload = { sub: user.id, jti: id };
    return {
      user,
      merchant,
      authentication: {
        refreshToken: token,
        accessToken: this.jwtService.sign(payload),
      },
    };
  }

  async refreshToken(payload: RefreshTokenDto) {
    const validToken = await this.tokensService.findValidToken(
      payload.refreshToken,
    );
    if (!validToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.tokensService.delete(validToken);
    const { id, token } = await this.tokensService.create(validToken.user.id);
    const jwtPayload = { sub: validToken.user.id, jti: id };

    return {
      authentication: {
        refreshToken: token,
        accessToken: this.jwtService.sign(jwtPayload),
      },
    };
  }

  async register(payload: RegisterUserDto) {
    await this.usersService.create(UserType.CLIENT, payload);
    return {
      _message: 'User registered successfully',
    };
  }

  async registerMerchant(payload: RegisterMerchantDto) {
    await this.merchantsService.create(payload);
  }

  async logout(token: Token) {
    await this.tokensService.delete(token);
  }
}
