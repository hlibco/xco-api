import { Test, TestingModule } from '@nestjs/testing';
import { toCamelCase } from './format';

describe('format', () => {
  it('should format to camelCase', () => {
    const target = 'lifeIsGood';
    const result = toCamelCase('life_is_good');

    expect(result).toBe(target);
  });
});
