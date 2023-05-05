import { ApiTags } from '@nestjs/swagger';
import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {UsersService} from "../service/users.service";
import { ApiCreatedResponse } from '@nestjs/swagger';
import {UserPayload} from "../../common/user.payload.decorator";
import {UserPayloadInterface} from "../../common/user.payload.interface";
import {JwtAuthGuard} from "../../auth/guard/jwt-auth.guard";
import {Users} from "../entities/user.entity";
import {CreateUserDto} from "../dto/create.user.dto";
@ApiTags('Users')
@Controller('user')
export class UsersController {
    public constructor(private readonly usersService: UsersService) {
    }

    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse()
    @Get('')
    public async getProfile(
        @UserPayload() user: UserPayloadInterface
    ): Promise<Users>{
        return this.usersService.findOneById(user.id)
    }

    @ApiCreatedResponse({type: ()=> CreateUserDto})
    @Post('')
    public async registerUser(
        @Body() dto: CreateUserDto
    ): Promise<Users>{
        return this.usersService.createUser(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    public async getUserById(
        @Param() data: {id: string}
    ): Promise<Users>{
        return this.usersService.findOneById(data.id);
    }
}