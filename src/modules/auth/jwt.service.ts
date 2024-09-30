import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '../../common/interfaces';

@Injectable()
export class JwtServiceLocal {
    constructor(
        private readonly jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    signAcessToken(payload: JwtPayload) {
        return this.jwtService.sign(payload, {
            algorithm: 'RS256',
            privateKey: this.configService.get<string>('JWT_SECRET_ACESS_TOKEN_PRIVATE').replaceAll('\\n', '\n'),
            expiresIn: this.configService.get('JWT_ACESS_TOKEN_EXPIRES_IN'),
        });
    }

    signRefreshToken(payload: JwtPayload) {
        return this.jwtService.sign(payload, {
            algorithm: 'RS256',
            privateKey: this.configService.get('JWT_SECRET_REFRESH_TOKEN_PRIVATE').replaceAll('\\n', '\n'),
            expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
        });
    }

    signToken(payload: JwtPayload) {
        const accessToken = this.signAcessToken(payload);
        const refreshToken = this.signRefreshToken(payload);

        const expRefreshToken = this.jwtService.decode(refreshToken).exp;

        return {
            accessToken,
            refreshToken: {
                token: refreshToken,
                exp: expRefreshToken,
            },
        };
    }
}
