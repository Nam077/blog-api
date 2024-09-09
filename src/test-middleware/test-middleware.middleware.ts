import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class TestMiddlewareMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        console.log('middleware test 1');
        next();
    }
}
