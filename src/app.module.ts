import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { MerchantsModule } from './merchants/merchants.module';
import { StationsModule } from './stations/stations.module';
import { PortsModule } from './ports/ports.module';
import { CardsModule } from './cards/cards.module';
import { ChargeSessionsModule } from './charge-sessions/charge-sessions.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    UsersModule,
    TokensModule,
    MerchantsModule,
    StationsModule,
    PortsModule,
    CardsModule,
    ChargeSessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
