import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

class DemoBody {
    name: string;
    age: number;
}

@Controller('hello-world')
@ApiTags('Hello World')
export class HelloWorldController {
    @Get('/')
    getHello(): string {
        return 'Hello moi nguoi da den voi khoa hoc NestJs';
    }

    @Get(':name')
    getHelloWithParam(@Param('name') name: string): string {
        return `Hello ${name} da den voi khoa hoc NestJs`;
    }

    @Get('nam/:name')
    getHelloWithParam2(@Param('name') name: string): string {
        return `Hello ${name} da den voi khoa hoc NestJs`;
    }

    @Post()
    demoPost(@Body() body: DemoBody) {
        return body;
    }

    @Post(':name')
    demoPostWithParam(@Body() body: DemoBody, @Param('name') name: string) {
        return {
            body,
            name,
        };
    }

    @Patch(':name')
    demoPatchWithParam(@Body() body: DemoBody, @Param('name') name: string) {
        return {
            body,
            name,
        };
    }

    @Delete(':name')
    deleteHelloWithParam(@Param('name') name: string): string {
        return `Delete ${name} da den voi khoa hoc NestJs`;
    }
}
