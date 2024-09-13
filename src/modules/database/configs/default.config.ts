import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Blog } from '../../blog/entities/blog.entity';
import { Category } from '../../category/entities/category.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { Profile } from '../../user/entities/profile.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
class DefaultConfig implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get('DATABASE_HOST'),
            port: this.configService.get('DATABASE_PORT'),
            username: this.configService.get('DATABASE_USER'),
            password: this.configService.get('DATABASE_PASSWORD'),
            database: this.configService.get('DATABASE_NAME'),
            entities: [User, Profile, Blog, Category, Tag],
            synchronize: true,
            autoLoadEntities: true,
            logging: true,
        };
    }
}

export default DefaultConfig;
