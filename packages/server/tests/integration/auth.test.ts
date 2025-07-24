import request from 'supertest';
import { spotifyMockServer } from '../mocks/spotify-api.mock';
import { TestServer } from '../utils/test-server';

describe('Authentication Endpoints', () => {
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

  describe('GET /connect', () => {
    it('should redirect to Spotify authorization URL', async () => {
      const response = await request(app).get('/connect');
      
      // Check if it's a redirect
      expect(response.status).toBe(302);
      
      // Check if it redirects to Spotify
      const redirectUrl = response.headers.location;
      expect(redirectUrl).toBeDefined();
      expect(redirectUrl).toContain('accounts.spotify.com/authorize');
      expect(redirectUrl).toContain('client_id=');
      expect(redirectUrl).toContain('redirect_uri=');
      expect(redirectUrl).toContain('response_type=code');
      expect(redirectUrl).toContain('state=');
    });
  });

  describe('GET /callback', () => {
    it('should handle Spotify callback and set cookie', async () => {
      const response = await request(app)
        .get('/callback')
        .query({ code: 'test_auth_code', state: 'test_state' });
      
      // Should redirect to client URL
      expect(response.status).toBe(302);
      
      // Should set cookie
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toContain('jams_token=');
      
      // Should redirect to generate-playlist page
      const redirectUrl = response.headers.location;
      expect(redirectUrl).toContain('/generate-playlist');
    });

    it('should handle errors in Spotify callback', async () => {
      // Override the mock to simulate an error
      spotifyMockServer.use(
        // @ts-ignore - MSW types issue
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      );

      const response = await request(app)
        .get('/callback')
        .query({ error: 'access_denied' });
      
      expect(response.status).toBe(500);
    });
  });
});