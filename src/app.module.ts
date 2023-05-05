import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module"
import { config } from './common/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from "@nestjs/config";
import {AllExceptionsFilter} from "./common/http-exception.filter";
import { APP_FILTER } from '@nestjs/core';
@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync({
          useFactory: () => config.getDatabaseOptions(),
      }),
      AuthModule,
      UsersModule
  ],
  controllers: [],
  providers: [
      {
          provide: APP_FILTER,
          useClass: AllExceptionsFilter,
      }
  ],
})
export class AppModule {}
