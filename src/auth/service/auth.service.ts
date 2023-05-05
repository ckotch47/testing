import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService} from "../../users/service/users.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    public constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username:string, pass: string) {
        const user = await this.usersService.findOneByUsername(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { username: user.username, id: user.id };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}