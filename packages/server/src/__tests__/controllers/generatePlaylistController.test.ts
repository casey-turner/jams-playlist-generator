import { OpenAI } from 'openai';
import { generatePlaylist } from '../../controllers/generatePlaylistController';
import { spotifyApi } from '../../apis/spotifyApi';
import { mockRequest, mockResponse, mockOpenAIResponse, mockSpotifyTrackData } from '../utils/mocks';

// Mock the OpenAI module
jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: jest.fn().mockResolvedValue({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      playlist: [
                        { artist: 'Artist 1' },
                        { artist: 'Artist 2' },
                        { artist: 'Artist 3' },
                      ],
                      playlistTitles: [
                        { title: 'Playlist Title 1' },
                        { title: 'Playlist Title 2' },
                        { title: 'Playlist Title 3' },
                        { title: 'Playlist Title 4' },
                        { title: 'Playlist Title 5' },
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

// Mock the spotifyApi
jest.mock('../../apis/spotifyApi', () => {
  return {
    spotifyApi: {
      get: jest.fn(),
    },
  };
});

// Mock the logger to avoid console output during tests
jest.mock('../../utils/logger', () => {
  return {
    logLevels: {
      error: 'error',
      info: 'info',
      warn: 'warn',
    },
    logger: jest.fn(),
  };
});

describe('generatePlaylistController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a playlist successfully', async () => {
    // Arrange
    const req = mockRequest({
      body: {
        data: {
          genres: ['rock', 'pop'],
          numberOfSongs: 3,
        },
      },
    });
    const res = mockResponse();

    // Mock the Spotify API response
    (spotifyApi.get as jest.Mock).mockResolvedValue(mockSpotifyTrackData);

    // Act
    await generatePlaylist(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        playlist: expect.arrayContaining([
          expect.objectContaining({
            title: expect.any(String),
            uri: expect.any(String),
            artist: expect.any(String),
            album: expect.any(String),
            albumCover: expect.any(String),
          }),
        ]),
        playlistTitles: expect.any(Array),
      })
    );
  });

  it('should return 500 when Spotify auth data is missing', async () => {
    // Arrange
    const req = mockRequest({
      spotifyAuthData: undefined,
      body: {
        data: {
          genres: ['rock', 'pop'],
          numberOfSongs: 3,
        },
      },
    });
    const res = mockResponse();

    // Act
    await generatePlaylist(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
  });

  it('should return 500 when OpenAI response is missing', async () => {
    // Arrange
    const req = mockRequest({
      body: {
        data: {
          genres: ['rock', 'pop'],
          numberOfSongs: 3,
        },
      },
    });
    const res = mockResponse();

    // Mock the OpenAI response to be null
    jest.spyOn(OpenAI.prototype.chat.completions, 'create').mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: null,
          },
        },
      ],
    } as any);

    // Act
    await generatePlaylist(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
  });

  it('should return 500 when Spotify API call fails', async () => {
    // Arrange
    const req = mockRequest({
      body: {
        data: {
          genres: ['rock', 'pop'],
          numberOfSongs: 3,
        },
      },
    });
    const res = mockResponse();

    // Mock the Spotify API to throw an error
    (spotifyApi.get as jest.Mock).mockRejectedValue(new Error('Spotify API error'));

    // Act
    await generatePlaylist(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
  });
});