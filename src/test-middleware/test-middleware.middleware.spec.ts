import { TestMiddlewareMiddleware } from './test-middleware.middleware';

describe('TestMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new TestMiddlewareMiddleware()).toBeDefined();
  });
});
