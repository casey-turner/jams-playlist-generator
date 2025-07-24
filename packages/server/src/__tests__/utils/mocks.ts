import { Request, Response } from 'express';

// Mock request object
export const mockRequest = (overrides = {}) => {
  const req = {
    body: {},
    params: {},
    query: {},
    headers: {},
    cookies: {},
    spotifyAuthData: {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      expires_in: 3600,
    },
    ...overrides,
  };
  return req as Request;
};

// Mock response object
export const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res as Response;
};

// Mock next function
export const mockNext = jest.fn();

// Mock OpenAI response
export const mockOpenAIResponse = {
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
};

// Mock Spotify track data
export const mockSpotifyTrackData = {
  data: {
    tracks: {
      items: [
        {
          name: 'Track Name',
          uri: 'spotify:track:123456',
          artists: [{ name: 'Artist Name' }],
          album: {
            name: 'Album Name',
            images: [
              { url: 'large-image-url' },
              { url: 'medium-image-url' },
              { url: 'small-image-url' },
            ],
          },
        },
      ],
    },
  },
};