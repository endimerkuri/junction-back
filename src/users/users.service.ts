import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations: ['card'] });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['card'],
    });
  }

  async create(userType: UserType, payload: RegisterUserDto): Promise<User> {
    const existingUser = await this.findOneByEmail(payload.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new User();
    user.type = userType;
    user.email = payload.email;
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.password = await bcrypt.hash(payload.password, 10);
    await this.userRepository.save(user);
    return user;
  }
}
