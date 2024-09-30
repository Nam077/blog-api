import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as crypto from 'crypto';
import { Request, Response } from 'express';

import { CurrentUser } from '../../common';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('generate-token')
    async generateToken() {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
        });

        return { publicKey, privateKey };
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const data = await this.authService.login(loginDto);

        res.cookie('refresh_token', data.refreshToken.token, {
            httpOnly: true,
            path: '/',
            // expires: convertTimestampToDate(data.refreshToken.exp),
        });
        delete data.refreshToken;

        return data;
    }

    @Get('refresh')
    @UseGuards(RefreshJwtGuard)
    async get(@CurrentUser<User>() user: User, @Req() req: Request) {
        const data = await this.authService.refresh(user, req.cookies.refresh_token);

        return data;
    }

    @UseGuards(JwtGuard)
    @Get('me')
    async me(@CurrentUser<User>() user: User) {
        return user;
    }
}
