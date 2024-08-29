import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWorldService {
    getHelloWorld() {
        return {
            message: 'Hello, World!',
            status: 200,
        };
    }
}
