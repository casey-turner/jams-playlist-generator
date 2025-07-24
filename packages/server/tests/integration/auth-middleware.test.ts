import request from 'supertest';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../src/config';
import { spotifyMockServer } from '../mocks/spotify-api.mock';
import { createAuthHeader, generateMockToken } from '../utils/test-helpers';
import { TestServer } from '../utils/test-server';

describe('Authentication Middleware', () => {
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

  describe('authenticateUser middleware', () => {
    it('should allow access with valid token', async () => {
      const response = await request(app)
        .post('/playlist')
        .set(createAuthHeader())
        .send({
          data: {
            genres: ['rock'],
            numberOfSongs: 1,
          },
        });

      expect(response.status).not.toBe(401);
    });

    it('should reject access with missing authorization header', async () => {
      const response = await request(app)
        .post('/playlist')
        .send({
          data: {
            genres: ['rock'],
            numberOfSongs: 1,
          },
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Authorization header missing');
    });

    it('should reject access with invalid token', async () => {
      const response = await request(app)
        .post('/playlist')
        .set({ Authorization: 'Bearer invalid_token' })
        .send({
          data: {
            genres: ['rock'],
            numberOfSongs: 1,
          },
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid or expired token');
    });

    it('should refresh token when expired', async () => {
      // Create an expired token
      const expiredToken = generateMockToken({
        timestamp: Date.now() - 4000000, // Set timestamp to past
        expires_in: 3600,
      });

      const response = await request(app)
        .post('/playlist')
        .set({ Authorization: `Bearer ${expiredToken}` })
        .send({
          data: {
            genres: ['rock'],
            numberOfSongs: 1,
          },
        });

      // Should still succeed because token is refreshed
      expect(response.status).toBe(200);
      
      // Check if cookie is set with new token
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toContain('jams_token=');
    });
  });
});