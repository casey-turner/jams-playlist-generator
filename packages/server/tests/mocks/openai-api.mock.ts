import { mockOpenAIResponse } from '../utils/test-helpers';

// Mock OpenAI class
export class MockOpenAI {
  chat = {
    completions: {
      create: jest.fn().mockResolvedValue({
        choices: [
          {
            message: {
              content: JSON.stringify(mockOpenAIResponse),
            },
          },
        ],
      }),
    },
  };
}

// Mock for the OpenAI module
jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => new MockOpenAI()),
  };
});