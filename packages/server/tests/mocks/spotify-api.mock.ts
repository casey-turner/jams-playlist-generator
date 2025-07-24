import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockSpotifyTrack } from '../utils/test-helpers';

// Mock Spotify API responses
export const spotifyHandlers = [
  // Mock token endpoint
  rest.post('https://accounts.spotify.com/api/token', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: 'mock_access_token',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'mock_refresh_token',
        scope: 'user-read-private user-read-email playlist-modify-public playlist-modify-private',
      })
    );
  }),

  // Mock user profile endpoint
  rest.get('https://api.spotify.com/v1/me', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 'mock_user_id',
        display_name: 'Test User',
        email: 'test@example.com',
        images: [],
        country: 'US',
        product: 'premium',
      })
    );
  }),

  // Mock search endpoint
  rest.get('https://api.spotify.com/v1/search', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tracks: {
          items: [mockSpotifyTrack],
        },
      })
    );
  }),

  // Mock create playlist endpoint
  rest.post('https://api.spotify.com/v1/users/:userId/playlists', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 'mock_playlist_id',
        name: req.body?.name || 'Mock Playlist',
        description: req.body?.description || '',
        public: req.body?.public || false,
        collaborative: false,
        external_urls: {
          spotify: 'https://open.spotify.com/playlist/mock_playlist_id',
        },
      })
    );
  }),

  // Mock add tracks to playlist endpoint
  rest.post('https://api.spotify.com/v1/playlists/:playlistId/tracks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        snapshot_id: 'mock_snapshot_id',
      })
    );
  }),
];

// Create MSW server with Spotify handlers
export const spotifyMockServer = setupServer(...spotifyHandlers);