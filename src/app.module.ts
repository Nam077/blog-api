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
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNDZlNWQ4OC0wMGM5LTRlYjctOTNhYi1hMzJmMzFjNmY2OWQiLCJlbWFpbCI6ImRlbW9AZ21haWwuY29tIiwibmFtZSI6IkpPSE4iLCJpYXQiOjE3MjgyMDU0MjYsImV4cCI6MTczMzM4OTQyNn0.gCQALAEE0wtB0BXLSO28-kyo-RU_gR3eBWD_G9AgAVfegkJjw-7vf0RZapWa4fV4gejm8XT0BLZn82t-TLfOTbvdMe8MA5JK2BAm6hHiEJ9B40tQKWA2ianPHap9xrni45l2ZiSUn9g5ivIhg72SvCJCcMscnpR0P6i8F4wGGttL4p7yZ3FVMbq4y3ABmt2_-NEKZNnk8dV1gqDGIWo3hjQDRI8uYDcHqrAJddNmamutN4tvdLqyZIzELg169mmjV4q4C1jBZ0xG1rKc9CYlXxxwBqWFbZqmTRWspmTpM8bXZVaXqzHSZO1BQfcfedzWISI3YMfXthd77AQbzTjbSg';

        req.headers.authorization = `Bearer ${accessToken}`;

        next();
    }
}
