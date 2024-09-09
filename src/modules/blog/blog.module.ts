import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
    imports: [forwardRef(() => UserModule)],
    controllers: [BlogController],
    providers: [BlogService],
    exports: [BlogService],
})
export class BlogModule {}
