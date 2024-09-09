import { forwardRef, Module } from '@nestjs/common';

import { BlogModule } from './../blog/blog.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [forwardRef(() => BlogModule)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
