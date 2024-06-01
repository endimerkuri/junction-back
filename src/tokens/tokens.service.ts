import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { MoreThan, Repository } from 'typeorm';
import crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokensService {
  private refreshTokenLength = 256;

  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private configService: ConfigService,
  ) {}

  async findById(id: string): Promise<Token> {
    return this.tokenRepository.findOneBy({ id });
  }

  async findValidToken(token: string): Promise<Token> {
    const now = new Date();
    return this.tokenRepository.findOne({
      where: {
        token,
        expiresAt: MoreThan(now),
      },
      relations: ['user'],
    });
  }

  async delete(token: Token): Promise<void> {
    await this.tokenRepository.remove(token);
  }

  async create(userId: string): Promise<Token> {
    const refreshToken = crypto
      .randomBytes(this.refreshTokenLength)
      .toString('hex');
    const validityInDays = this.configService.get<number>(
      'refreshToken.validityInDays',
    );
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + validityInDays);

    const token = await this.tokenRepository.save({
      userId,
      token: refreshToken,
      expiresAt,
    });

    return token;
  }
}
