import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../src/config';

/**
 * Generate a mock JWT token for testing authenticated endpoints
 */
export function generateMockToken(payload: any = {}): string {
  const defaultPayload = {
    access_token: 'mock_access_token',
    refreshToken: 'mock_refresh_token',
    expires_in: 3600,
    timestamp: Date.now(),
    userId: 'mock_user_id',
    ...payload,
  };

  return jwt.sign(defaultPayload, JWT_SECRET as string);
}

/**
 * Create authorization header with mock token
 */
export function createAuthHeader(token?: string): { Authorization: string } {
  const authToken = token || generateMockToken();
  return { Authorization: `Bearer ${authToken}` };
}

/**
 * Mock Spotify track data
 */
export const mockSpotifyTrack = {
  name: 'Test Track',
  uri: 'spotify:track:123456',
  artists: [{ name: 'Test Artist' }],
  album: {
    name: 'Test Album',
    images: [
      { url: 'https://example.com/image1.jpg' },
      { url: 'https://example.com/image2.jpg' },
    ],
  },
};

/**
 * Mock OpenAI playlist response
 */
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