import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class Test2MiddlewareMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        console.log('middleware test 2');
        next();
    }
}
