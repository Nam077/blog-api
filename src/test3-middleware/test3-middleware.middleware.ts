import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class Test3MiddlewareMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        console.log('middleware test 3');
        next();
    }
}
