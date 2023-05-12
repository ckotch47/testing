import {Test, TestingModule} from '@nestjs/testing'
import { AuthController } from "./auth.controller";
import { AuthService } from "../service/auth.service";
import { JwtService } from '@nestjs/jwt';
import {UsersService} from "../../users/service/users.service";
import {AppModule} from "../../app.module";
import {Repository} from "typeorm";
import {Users} from "../../users/entities/user.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {AuthUserDto} from "../dto/auth.user.dto";

describe('Auth Controller Integration', () => {
    let authController: AuthController;
    // let authService: AuthService;
    // let usersService: UsersService;
    // let jwtService: JwtService;
    //
    // let usersRepository: Repository<Users>;


    beforeAll(async ()=>{
        const app: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: getRepositoryToken(Users),
                useClass: Repository,
            }],
            imports: [AppModule]
        }).compile();

        authController = app.get<AuthController>(AuthController);
        // authService = app.get<AuthService>(AuthService);
        // usersService = app.get<UsersService>(UsersService);
        // jwtService = app.get<JwtService>(JwtService);
        // usersRepository = app.get<Repository<Users>>(getRepositoryToken(Users));
    });

    describe('init',  () => {
        // it('should all service to be defined', async ()=>{
        //     expect(authController).toBeDefined();
        //     expect(authService).toBeDefined();
        //     expect(usersService).toBeDefined();
        //     expect(jwtService).toBeDefined();
        //     expect(usersRepository).toBeDefined();
        // });
    });
    describe('auth', () => {
        let user = new AuthUserDto();
        user.username = 'user1';
        user.password = 'pass';

       it('should auth success', async ()=>{
           // const authServiceSighIn = jest.spyOn(authService, "signIn");
           // const usersServiceFindOneBuUsername = jest.spyOn(usersService, "findOneByUsername");
           // const usersRepositoryFindOneByOneOrFail = jest.spyOn(usersRepository, "findOneByOrFail");
           // const jwtServiceSignAsync = jest.spyOn(jwtService, "signAsync");

          const res = await authController.authUser(user);

          // expect(authServiceSighIn).toBeCalledWith(user.username, user.password);
          // expect(usersServiceFindOneBuUsername).toBeCalledWith(user.username);
          // expect(usersRepositoryFindOneByOneOrFail).toBeCalledWith({username: user.username});
          // expect(jwtServiceSignAsync).toBeCalledWith({username: user.username, id: expect.any(String)});

          expect(res).toStrictEqual({access_token: expect.any(String)})
           console.log(res)
       });
    });
});