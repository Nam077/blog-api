import { AuthModule } from '@modules/auth/auth.module';
import { BlogModule } from '@modules/blog/blog.module';
import { CategoryModule } from '@modules/category/category.module';
import { DatabaseModule } from '@modules/database/database.module';
import { TagModule } from '@modules/tag/tag.module';
import { UserModule } from '@modules/user/user.module';
import { WinstonModuleConfig } from '@modules/winton/winton.module';
import { Injectable, MiddlewareConsumer, Module, NestMiddleware, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NextFunction, Request } from 'express';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}.local`,
        }),
        DatabaseModule,
        WinstonModuleConfig,
        UserModule,
        TagModule,
        BlogModule,
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
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNDZlNWQ4OC0wMGM5LTRlYjctOTNhYi1hMzJmMzFjNmY2OWQiLCJlbWFpbCI6ImRlbW9AZ21haWwuY29tIiwibmFtZSI6IkpPSE4iLCJpYXQiOjE3MjgyMDc5NDQsImV4cCI6MTczMzM5MTk0NH0.KX3NjlnC18Nv8h0VFz61i7WRhQv7z__zC2eIvKTXWwaz6hNWuTyfgYYxWxJ7nARryckRtJijQILi51JbRK9FLHpRd75ONboGs4GCMT23mlUVUTNlA9YrI14CpyFNd8R467LVN6CRmOuEaBmsJwlKuIfZfc_bUx3Vi0oGVtVZ8v2EoLkNmg8rx8Uj19IeacwY8ti1yVJPbLsQgv-zrTDKKj97Uyj7rxnCBR2UHAUQTcxVbukFDMVRlK2HKt3N_Qj_Zz9_9huYLhma6jUtZncI9JYtldkDBqYq_6XnSWAVfji-bJUSLnyIONOktXcLbF3lxzPW5pTKa83Myuh9pK3jVg';

        req.headers.authorization = `Bearer ${accessToken}`;

        next();
    }
}
