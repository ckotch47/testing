import { Test } from '@nestjs/testing';
import {UsersService} from "./users.service";
import {Repository} from "typeorm";
import {Users} from "../entities/user.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {NotFoundException} from "@nestjs/common";

describe('UserService', () => {
    let usersService: UsersService;
    let userRepository: Repository<Users>

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(Users),
                    useClass: Repository,
                },
            ],
        }).compile();
        usersService = module.get(UsersService);
        userRepository = module.get(getRepositoryToken(Users)) // получаем токен репозитории
    });



    it('should throw NotFound exception', async () => {
        // начинаем следить за функции findOneByOrFail из класса Repository<Users>
        const find = jest.spyOn(userRepository as Repository<Users>, 'findOneByOrFail');
        // объявляем что findOneByOrFail падает с ошибкой NotFoundException.
        // изначально функция возвращаеет Promise что бы его разрешить,
        // используется Promise.reject (для ошибок) и Promise.resolve (будет возвращать <Users> )
        find.mockReturnValue(Promise.reject(new NotFoundException()));
        // проверяем ответ
        await expect(usersService.findOneById('123')).rejects.toThrow(NotFoundException);
    });



});
