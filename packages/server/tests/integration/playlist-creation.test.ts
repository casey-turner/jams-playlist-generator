import request from 'supertest';
import { rest } from 'msw';
import { spotifyMockServer } from '../mocks/spotify-api.mock';
import { createAuthHeader } from '../utils/test-helpers';
import { TestServer } from '../utils/test-server';

describe('Playlist Creation Endpoint', () => {
  const testServer = new TestServer();
  const app = testServer.getApp();

  // Start MSW server to intercept API requests
  beforeAll(() => {
    spotifyMockServer.listen();
  });

  // Reset handlers between tests
  afterEach(() => {
    spotifyMockServer.resetHandlers();
  });

  // Close server when done
  afterAll(() => {
    spotifyMockServer.close();
  });

  describe('POST /create-playlist', () => {
    it('should create a playlist successfully', async () => {
      const requestBody = {
        tracks: [
          'spotify:track:123456',
          'spotify:track:789012',
        ],
        playlistTitle: 'Test Playlist',
      };

      const response = await request(app)
        .post('/create-playlist')
        .set(createAuthHeader())
        .send(requestBody);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Playlist created successfully');
      expect(response.body).toHaveProperty('playlistId', 'mock_playlist_id');
    });

    it('should return 401 when not authenticated', async () => {
      const requestBody = {
        tracks: [
          'spotify:track:123456',
          'spotify:track:789012',
        ],
        playlistTitle: 'Test Playlist',
      };

      const response = await request(app)
        .post('/create-playlist')
        .send(requestBody);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Authorization header missing');
    });

    it('should return 422 with missing tracks', async () => {
      const requestBody = {
        playlistTitle: 'Test Playlist',
      };

      const response = await request(app)
        .post('/create-playlist')
        .set(createAuthHeader())
        .send(requestBody);

      expect(response.status).toBe(422);
      expect(response.body).toHaveProperty('message', 'Missing or invalid input data.');
    });

    it('should handle Spotify API errors when creating playlist', async () => {
      // Override the mock to simulate an error
      spotifyMockServer.use(
        rest.post('https://api.spotify.com/v1/users/:userId/playlists', (req, res, ctx) => {
          return res(ctx.status(400), ctx.json({ error: 'Bad request' }));
        })
      );

      const requestBody = {
        tracks: [
          'spotify:track:123456',
          'spotify:track:789012',
        ],
        playlistTitle: 'Test Playlist',
      };

      const response = await request(app)
        .post('/create-playlist')
        .set(createAuthHeader())
        .send(requestBody);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Playlist creation failed');
    });

    it('should handle Spotify API errors when adding tracks', async () => {
      // Override the mock to simulate successful playlist creation but failed track addition
      spotifyMockServer.use(
        rest.post('https://api.spotify.com/v1/playlists/:playlistId/tracks', (req, res, ctx) => {
          return res(ctx.status(400), ctx.json({ error: 'Bad request' }));
        })
      );

      const requestBody = {
        tracks: [
          'spotify:track:123456',
          'spotify:track:789012',
        ],
        playlistTitle: 'Test Playlist',
      };

      const response = await request(app)
        .post('/create-playlist')
        .set(createAuthHeader())
        .send(requestBody);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Adding tracks to playlist failed');
    });
  });
});