import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Users} from "./entities/user.entity";
import {UsersController} from "./controller/users.controller";
import {UsersService} from "./service/users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
