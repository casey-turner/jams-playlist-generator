import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set default timeout for tests
jest.setTimeout(30000);

// Global setup
beforeAll(() => {
  // Global setup code if needed
});

// Global teardown
afterAll(() => {
  // Global teardown code if needed
});