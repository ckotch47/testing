import { Test } from '@nestjs/testing';
import {UsersService} from "../../users/service/users.service";
import {AuthService} from "./auth.service";
import { JwtService } from '@nestjs/jwt';
import {UnauthorizedException} from '@nestjs/common';

describe('AuthService', () => {
    let usersService: UsersService;
    let authService: AuthService;
    let jwtService: JwtService
    let testUser = {
      username: 'user',
      password: 'pass',
        id: '1123'
    };
    beforeAll(async () => {
        const app = await Test.createTestingModule({
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        findOneByUsername: jest.fn(),
                    }
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn()
                    }
                },
                AuthService
            ],
        }).compile();
        usersService = app.get(UsersService);
        authService = app.get(AuthService);
        jwtService = app.get(JwtService);
    });



        it('should success auth user', async () => {
            const find = jest.spyOn(usersService as any, 'findOneByUsername');
            const signAsync = jest.spyOn(jwtService as JwtService, 'signAsync');
            find.mockReturnValue(testUser);

            signAsync.mockReturnValue(Promise.resolve('success'))

            const res = await authService.signIn(testUser.username, testUser.password);

            expect(find).toBeCalled();
            expect(find).toHaveBeenCalledTimes(1);
            expect(find).lastCalledWith(testUser.username);

            expect(signAsync).toHaveBeenCalledTimes(1);
            expect(signAsync).lastCalledWith({username: testUser.username, id: testUser.id})

            expect(res).toStrictEqual({access_token: 'success'})
        });

        it('throw auth', async () => {
            const find = jest.spyOn(usersService as any, 'findOneByUsername');
            const signAsync = jest.spyOn(jwtService as JwtService, 'signAsync');

            find.mockReturnValue({
                id: testUser.id,
                username: testUser.username,
                pass: '123'
            });

            const res = authService.signIn(testUser.username, testUser.password);
            await expect(res).rejects.toThrow(UnauthorizedException);
        })

});
