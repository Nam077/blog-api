import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import * as fs from 'fs';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

export interface JWTPayload {
    sub: string;
    email: string;
    name: string;
    role: string;
}
export interface LoginResponse {
    message: string;
    data: {
        accessToken: string;
        refreshToken: string;
        user: User;
    };
}
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const user: User = await this.userService.findByEmail(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }

        const isPasswordMatch = user.comparePassword(loginDto.password);

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }

        const data = await this.generatToken(user);

        delete data.user.password;

        return {
            message: 'Đăng nhập thanh công',
            data,
        };
    }

    async generateAccessToken(user: User) {
        const payload: JWTPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        return this.jwtService.sign(payload, {
            algorithm: 'RS256',
            privateKey: this.configService.get<string>('RSA_PRIVATE_KEY_ACESS').replaceAll('\\n', '\n'),
            expiresIn: this.configService.get<string>('ACESS_TOKEN_EXPIRES_IN'),
        });
    }

    async generateRefreshToken(user: User) {
        const payload: JWTPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        return this.jwtService.sign(payload, {
            algorithm: 'RS256',
            privateKey: this.configService.get<string>('RSA_PRIVATE_KEY_RF').replaceAll('\\n', '\n'),
            expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
        });
    }

    async generatToken(user: User) {
        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);

        return {
            accessToken,
            refreshToken,
            user,
        };
    }

    async generateKeyPairForRSA() {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });

        fs.writeFileSync('public.pem', publicKey);
        fs.writeFileSync('private.pem', privateKey);

        return {
            publicKey,
            privateKey,
        };
    }

    async validateUser(payload: JWTPayload) {
        return await this.userService.findOneOrFail(payload.sub);
    }
}
