# Integration Testing Documentation

This document provides information about the integration tests for the Jams backend API.

## Overview

The integration tests cover the following areas:
- Spotify authentication flow
- Playlist generation using OpenAI
- Playlist creation in Spotify
- Authentication middleware

## Test Structure

```
packages/server/tests/
├── integration/           # Integration tests for API endpoints
│   ├── auth.test.ts       # Tests for Spotify authentication endpoints
│   ├── auth-middleware.test.ts # Tests for authentication middleware
│   ├── playlist-generation.test.ts # Tests for playlist generation endpoint
│   └── playlist-creation.test.ts # Tests for playlist creation endpoint
├── mocks/                 # Mock implementations for external APIs
│   ├── spotify-api.mock.ts # Mock for Spotify API
│   └── openai-api.mock.ts # Mock for OpenAI API
├── utils/                 # Test utilities
│   ├── test-server.ts     # Test server setup
│   └── test-helpers.ts    # Helper functions for testing
└── setup.ts               # Global test setup
```

## Running Tests

### Prerequisites

Before running the tests, make sure you have:
1. Node.js and npm installed
2. All dependencies installed (`npm install`)
3. A `.env.test` file with test environment variables

### Commands

Run all tests:
```bash
npm test
```

Run tests in watch mode (useful during development):
```bash
npm run test:watch
```

Run tests with coverage report:
```bash
npm run test:coverage
```

## Test Environment

The tests use a separate test environment defined in `.env.test`. This ensures that:
1. Tests don't interact with production services
2. Tests use mock credentials and endpoints
3. Tests run on a different port than the development server

## Mocking Strategy

### External APIs

The tests use Mock Service Worker (MSW) to intercept HTTP requests to external APIs:
- Spotify API requests are mocked in `spotify-api.mock.ts`
- OpenAI API is mocked using Jest's module mocking in `openai-api.mock.ts`

This approach allows tests to run without actual API calls, making them:
- Faster
- More reliable
- Independent of external services

### Authentication

For authenticated endpoints, the tests use:
- Mock JWT tokens generated with test credentials
- Helper functions to create authorization headers

## Writing New Tests

### Adding a New Test File

1. Create a new file in the `tests/integration` directory
2. Import the necessary utilities and mocks
3. Use the `TestServer` class to get the Express app
4. Write your tests using Jest and Supertest

Example:
```typescript
import request from 'supertest';
import { TestServer } from '../utils/test-server';
import { createAuthHeader } from '../utils/test-helpers';

describe('My New Endpoint', () => {
  const testServer = new TestServer();
  const app = testServer.getApp();

  it('should return expected response', async () => {
    const response = await request(app)
      .get('/my-endpoint')
      .set(createAuthHeader())
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
  });
});
```

### Adding New Mocks

If you need to mock additional external services:

1. Create a new mock file in the `tests/mocks` directory
2. Use MSW for HTTP-based APIs or Jest's module mocking for direct imports
3. Import and use the mock in your test files

## CI/CD Integration

The tests are configured to run as part of the CI/CD pipeline. The following steps are performed:

1. Install dependencies
2. Run linting
3. Run tests with coverage report
4. Build the application if tests pass

To add the tests to your CI/CD pipeline, include the following command:
```bash
npm test
```

## Troubleshooting

### Common Issues

1. **Tests fail with authentication errors**
   - Check that the JWT_SECRET in .env.test is set correctly
   - Verify that the mock tokens are being generated correctly

2. **Mock API responses not working**
   - Ensure MSW is properly set up and running
   - Check that the request URL and method match exactly what the code is calling

3. **Tests timeout**
   - Increase the timeout in setup.ts
   - Check for any hanging promises or unresolved async operations

### Debugging Tests

To debug tests:
1. Use `console.log` statements in your tests
2. Run tests in watch mode with `npm run test:watch`
3. Use the Node.js debugger with the `--inspect` flag

## Best Practices

1. **Isolation**: Each test should be independent and not rely on the state from other tests
2. **Mocking**: Mock all external dependencies to ensure tests are reliable
3. **Coverage**: Aim for high test coverage, especially for critical paths
4. **Readability**: Write clear test descriptions and assertions
5. **Maintenance**: Update tests when the API changes