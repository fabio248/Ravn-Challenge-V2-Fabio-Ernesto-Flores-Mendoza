/** @type {import('ts-jest').JestConfigWithTsJest} */
//Changes to test db
process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
};
