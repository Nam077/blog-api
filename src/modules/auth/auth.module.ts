import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtServiceLocal } from './jwt.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
    imports: [ConfigModule.forRoot(), JwtModule.register({}), UserModule],
    controllers: [AuthController],
    providers: [AuthService, JwtServiceLocal, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
