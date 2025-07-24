import { OpenAI } from 'openai';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the OpenAI module
vi.mock('openai', () => {
  return {
    OpenAI: vi.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      playlist: [
                        { artist: 'Artist 1' },
                        { artist: 'Artist 2' },
                      ],
                      playlistTitles: [
                        { title: 'Playlist Title 1' },
                        { title: 'Playlist Title 2' },
                      ],
                    }),
                  },
                },
              ],
            }),
          },
        },
      };
    }),
  };
});

// Mock the config module
vi.mock('../config', () => {
  return {
    OPENAI_API_KEY: 'mock-api-key',
  };
});

// Import the module after mocking dependencies
const generatePlaylistControllerModule = await import('../controllers/generatePlaylistController');

describe('generatePlaylistController', () => {
  let mockRequest: any;
  let mockResponse: any;
  
  beforeEach(() => {
    mockRequest = {
      spotifyAuthData: {
        access_token: 'mock-access-token',
      },
      body: {
        data: {
          genres: ['rock', 'pop'],
          numberOfSongs: 5,
          repeatArtist: false,
        },
      },
    };
    
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  it('should use the correct OpenAI model version', async () => {
    // Get the OpenAI constructor mock
    const OpenAIMock = OpenAI as unknown as jest.Mock;
    
    // Clear previous calls
    OpenAIMock.mockClear();
    
    // Re-import to trigger the OpenAI constructor
    await import('../controllers/generatePlaylistController');
    
    // Check that OpenAI was constructed with the correct API key
    expect(OpenAIMock).toHaveBeenCalledWith({
      apiKey: 'mock-api-key',
    });
    
    // Get the instance of the mock
    const openaiInstance = OpenAIMock.mock.results[0].value;
    
    // Check that the correct model is used when calling create
    const createSpy = openaiInstance.chat.completions.create;
    
    // Call the controller function to trigger the OpenAI API call
    await generatePlaylistControllerModule.generatePlaylist(mockRequest, mockResponse);
    
    // Verify that the create method was called with the correct model
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gpt-3.5-turbo-0125',
      })
    );
  });
});