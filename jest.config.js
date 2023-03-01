// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/.jest/setup-tests.js'],

  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);





//module.exports = {
//  coverageDirectory: 'coverage',
//  collectCoverage: true,
//  collectCoverageFrom: [
//    'src/**/*.{js,jsx,ts,tsx}',
//    '!<rootDir>/src/*.{js,jsx,ts,tsx}',
//    '!<rootDir>/src/**/*mock*.{js,jsx,ts,tsx}',
//    '!<rootDir>/src/types/**/*.{js,jsx,ts,tsx}',
//    '!<rootDir>/src/pages/**/*.{js,jsx,ts,tsx}',
//    '!<rootDir>/node_modules/',
//  ],
//
//  testEnvironment: 'jsdom',
//  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
//  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/.out/', '/public/'],
//
//  setupFilesAfterEnv: ['<rootDir>/.jest/setup-tests.js'],
//};