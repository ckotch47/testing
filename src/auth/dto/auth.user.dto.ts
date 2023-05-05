import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class AuthUserDto {
    @ApiProperty()
    @IsString()
    public username: string;

    @ApiProperty()
    @IsString()
    public password: string;
}