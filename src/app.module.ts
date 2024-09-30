import { Injectable, MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NextFunction, Request } from 'express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseModule } from './modules/database/database.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import { WinstonModuleConfig } from './modules/winton/winton.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}.local`,
        }),
        DatabaseModule,
        WinstonModuleConfig,
        UserModule,
        BlogModule,
        TagModule,
        CategoryModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthTestMiddleware).forRoutes('*');
    }
}

@Injectable()
export class AuthTestMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const accessToken =
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYzZWFhYS04MDViLTRlZDEtOWNiNS1jNmUxN2JkYTk2ZDYiLCJlbWFpbCI6ImRlbW9AZ21haWwuY29tIiwibmFtZSI6IkpPSE4iLCJpYXQiOjE3Mjc3MDg1NTMsImV4cCI6MTczMjg5MjU1M30.tBfa5Ro_WXMNQzYTUdC2yrECZX6XbwbxuXtNhIQVVT3M08EecQFHMEoTyxLRKB36p4gkbRgu5jjYT5Dt7r1w2Ehzu7zx-2W3_zQIGdK3wmduNlNDvaqVejpYo0fOsC2UXhiiiVAzMQXvylre-PCHRMkuDNHQp0vTCwp3jUt1o9QGKtvC4upC0crQL_tb78n9LuQsA7J0CxmNIg8Z2rTPkWcHHDaBuG3swbW39YDY7HRgt4hO4yXHlrN3rVaAGfcr8envua03bPrIjLJCjUXBT9Yh6l1jK7ely3oio3ExQf7EobPFt3v8bDIfyjh-WAlz-ZyNqbI8QhvRRL8wjGl7rw';

        req.headers.authorization = `Bearer ${accessToken}`;

        next();
    }
}
