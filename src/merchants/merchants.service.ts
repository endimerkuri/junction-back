import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchant } from './merchant.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { RegisterMerchantDto } from 'src/auth/dto/register-merchant.dto';
import { UserType } from 'src/users/user.entity';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantsRepository: Repository<Merchant>,
    private usersService: UsersService,
  ) {}

  async findById(id: string): Promise<Merchant> {
    return this.merchantsRepository.findOneBy({ id });
  }

  async findByUserId(userId: string): Promise<Merchant> {
    return this.merchantsRepository.findOneBy({ ownerId: userId });
  }

  async create(payload: RegisterMerchantDto): Promise<Merchant> {
    const { merchant: merchantPayload } = payload;
    const user = await this.usersService.create(UserType.MERCHANT, payload);
    const merchant = new Merchant();
    merchant.owner = user;
    merchant.name = merchantPayload.name;
    merchant.description = merchantPayload.description;
    await this.merchantsRepository.save(merchant);
    return merchant;
  }
}
