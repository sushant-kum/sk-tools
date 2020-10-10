import { CorsConfig } from './cors-config';

describe('CorsConfig', () => {
  it('should be defined', () => {
    expect(new CorsConfig()).toBeDefined();
  });
});
