import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { Users } from "../../users/entities/user.entity";
import { UsersService } from "../../users/service/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  public async validate(phone: string, password: string): Promise<Users> {
    const user = await this.usersService.findOneByUsername(phone);

    console.log(user)


    return user;
  }
}
