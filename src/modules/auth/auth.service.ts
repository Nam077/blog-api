import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtPayload } from '../../common/interfaces';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtServiceLocal } from './jwt.service';

export interface LoginResponse {
    accessToken: string;
    refreshToken: {
        token: string;
        exp: number;
    };
    message: string;
    user: Partial<User>;
}
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtServiceLocal,
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {}

    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const user = await this.userService.findUserByEmail(loginDto.email);

        if (!user) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        if (!user.comparePassword(loginDto.password)) throw new UnauthorizedException('Email hoặc mật khẩu không đúng');

        delete user.password;

        const { accessToken, refreshToken } = this.jwtService.signToken({
            sub: user.id,
            email: user.email,
            name: user.name,
        });

        return {
            message: 'Đăng nhập thành công',
            accessToken,
            refreshToken,
            user,
        };
    }

    async refresh(currenUser: User, refresh_token: any) {
        refresh_token;
        const user = await this.userService.findUserByEmail(currenUser.email);

        const accessToken = this.jwtService.signAcessToken({
            sub: user.id,
            email: user.email,
            name: user.name,
        });

        return {
            message: 'Refresh token thành công',
            accessToken,
        };
    }

    async validateUser(payload: JwtPayload) {
        return await this.userService.findOneByEmailAndId(payload.email, payload.sub, {
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });
    }
}
