/* eslint-disable func-style */
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function CurrentUser<T>(): ParameterDecorator {
    return createParamDecorator<keyof T | undefined, ExecutionContext>(
        (data: keyof T, ctx: ExecutionContext): T | T[keyof T] => {
            const request = ctx.switchToHttp().getRequest();
            const user = request.user as T;

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            // eslint-disable-next-line security/detect-object-injection
            return data ? user[data] : user;
        },
    )();
}
