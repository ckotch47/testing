import {Body, Controller, Post} from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {AuthService} from "../service/auth.service";
import {AuthUserDto} from "../dto/auth.user.dto";
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    public constructor(
        private readonly authService: AuthService
    ) {
    }

    @ApiCreatedResponse({type: ()=> AuthUserDto})
    @Post('')
    public async authUser(@Body() data: AuthUserDto): Promise<object>{
        return this.authService.signIn(data.username, data.password)
    }

}

