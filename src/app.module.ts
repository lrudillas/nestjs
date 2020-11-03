import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    UsersModule
  ]

export class AppModule {}