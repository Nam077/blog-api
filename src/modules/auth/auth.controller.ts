import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService, LoginResponse } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JWTAuthGuard } from './guards/jwt.guard';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
        return this.authService.login(loginDto);
    }

    @Post('me')
    @UseGuards(JWTAuthGuard)
    me() {
        return 'login thành công';
    }

    @Get('key')
    gh() {
        return this.authService.generateKeyPairForRSA();
    }
}
