# Server Package

This is the backend server for the Playlistify application.

## Testing

### Overview

The server package uses Jest as the testing framework with the following setup:

- **Jest**: Main testing framework
- **ts-jest**: TypeScript support for Jest
- **Supertest**: HTTP assertions for testing API endpoints

### Test Structure

Tests are organized in the `src/__tests__` directory with the following structure:

- `__tests__/apis`: Tests for API clients
- `__tests__/controllers`: Tests for controller functions
- `__tests__/middlewares`: Tests for middleware functions
- `__tests__/routes`: Tests for API routes
- `__tests__/utils`: Test utilities and mocks

### Running Tests

To run the tests, use the following commands:

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Writing Tests

When writing new tests:

1. Create test files with the `.test.ts` extension
2. Use the mocks in `__tests__/utils/mocks.ts` for common test objects
3. Mock external dependencies (OpenAI, Spotify API, etc.)
4. Follow the Arrange-Act-Assert pattern for test structure

### Test Coverage

The test coverage report shows which parts of the code are covered by tests. To view the coverage report:

1. Run `npm run test:coverage`
2. Open the `coverage/lcov-report/index.html` file in a browser