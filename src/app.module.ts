import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloWorldModule } from './modules/hello-world/hello-world.module';
import { Test } from './modules/test/entities/test.entity';
import { TestModule } from './modules/test/test.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '12345',
            database: 'api-blog',
            entities: [Test],
            synchronize: true,
            autoLoadEntities: true,
            logging: true,
        }),
        HelloWorldModule,
        TestModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

//// decorators
