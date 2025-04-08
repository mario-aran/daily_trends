import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  transform: { '^.+\\.tsx?$': ['ts-jest', {}] },
  clearMocks: true,

  // Coverage
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
};

export default config;
