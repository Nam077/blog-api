import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import DefaultConfig from './configs/default.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: DefaultConfig,
        }),
        ConfigModule.forRoot({}),
    ],
    providers: [DefaultConfig],
})
export class DatabaseModule {}
