import {BadRequestException, Injectable, InternalServerErrorException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Users} from "../entities/user.entity";
import {CreateUserDto} from "../dto/create.user.dto";

@Injectable()
export class UsersService {
    public constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>
    ) {}

    public async findOneByUsername(userName: string): Promise<Users>{
        return this.userRepository.findOneByOrFail({username: userName});
    }

    public async findOneById(userId: string): Promise<Users>{
        return this.userRepository.findOneByOrFail({id: userId});
    }

    public async createUser(dto: CreateUserDto): Promise<Users>{
        return this.userRepository.save(dto);
    }

}
