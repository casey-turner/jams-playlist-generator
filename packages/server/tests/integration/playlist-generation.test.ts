import request from 'supertest';
import '../mocks/openai-api.mock';
import { spotifyMockServer } from '../mocks/spotify-api.mock';
import { createAuthHeader, mockOpenAIResponse } from '../utils/test-helpers';
import { TestServer } from '../utils/test-server';

describe('Playlist Generation Endpoint', () => {
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

  describe('POST /playlist', () => {
    it('should generate a playlist successfully', async () => {
      const requestBody = {
        data: {
          genres: ['rock', 'pop'],
          numberOfSongs: 5,
        },
      };

      const response = await request(app)
        .post('/playlist')
        .set(createAuthHeader())
        .send(requestBody);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('playlist');
      expect(response.body).toHaveProperty('playlistTitles');
      expect(Array.isArray(response.body.playlist)).toBe(true);
      expect(Array.isArray(response.body.playlistTitles)).toBe(true);
    });

    it('should return 401 when not authenticated', async () => {
      const requestBody = {
        data: {
          genres: ['rock', 'pop'],
          numberOfSongs: 5,
        },
      };

      const response = await request(app)
        .post('/playlist')
        .send(requestBody);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Authorization header missing');
    });

    it('should return 401 with invalid token', async () => {
      const requestBody = {
        data: {
          genres: ['rock', 'pop'],
          numberOfSongs: 5,
        },
      };

      const response = await request(app)
        .post('/playlist')
        .set({ Authorization: 'Bearer invalid_token' })
        .send(requestBody);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid or expired token');
    });

    it('should handle missing request data', async () => {
      const response = await request(app)
        .post('/playlist')
        .set(createAuthHeader())
        .send({});

      expect(response.status).toBe(500);
    });
  });
});