import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { normalizeResponse } from 'src/util/helpers/response.helpers';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() payload: LoginDto) {
    const data = await this.authService.login(req.user);
    return normalizeResponse(data);
  }

  @Post('register')
  async register(@Body() payload: RegisterUserDto) {
    const data = await this.authService.register(payload);
    return normalizeResponse(data);
  }

  @Post('token')
  async refreshToken(@Body() payload: RefreshTokenDto) {
    const data = await this.authService.refreshToken(payload);
    return normalizeResponse(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    const { token } = req.user;
    await this.authService.logout(token);
    return normalizeResponse({ _message: 'Logout successful!' });
  }
}
