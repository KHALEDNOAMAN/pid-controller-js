/*
 * Jest was listed in devDependencies with ts-jest beside it, but nothing told
 * Jest to use ts-jest, so every suite failed to load with "Cannot use import
 * statement outside a module" and the run reported:
 *
 *     Test Suites: 3 failed, 3 total
 *     Tests:       0 total
 *
 * `npm test` exited non-zero, but the headline number people read is "0
 * total", and a suite that never loads looks a lot like a suite that has
 * nothing to say. This file is what makes the three existing test files
 * actually run.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
};
