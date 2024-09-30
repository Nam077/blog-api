import { Test, TestingModule } from '@nestjs/testing';
import { JwtRefreshStrategy } from './jwt-refresh-strategy';

describe('JwtRefreshStrategy', () => {
  let provider: JwtRefreshStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtRefreshStrategy],
    }).compile();

    provider = module.get<JwtRefreshStrategy>(JwtRefreshStrategy);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
