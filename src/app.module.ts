import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloWorldController } from './hello-world/hello-world.controller';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseModule } from './modules/database/database.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import { WinstonModuleConfig } from './modules/winton/winton.module';
import { TestMiddlewareMiddleware } from './test-middleware/test-middleware.middleware';
import { Test2MiddlewareMiddleware } from './test2-middleware/test2-middleware.middleware';
import { Test3MiddlewareMiddleware } from './test3-middleware/test3-middleware.middleware';

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
    controllers: [AppController, HelloWorldController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TestMiddlewareMiddleware, Test2MiddlewareMiddleware, Test3MiddlewareMiddleware).forRoutes('*');
    }
}
