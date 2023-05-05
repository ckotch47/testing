import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {AuthService} from "./service/auth.service";
import {AuthController} from "./controller/auth.controller";
import {UsersModule} from "../users/users.module";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {LocalStrategy} from "./strategies/local.strategy";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'secret',
            signOptions: { expiresIn: '3600m' },
        }),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy, LocalStrategy],
})
export class AuthModule {}
