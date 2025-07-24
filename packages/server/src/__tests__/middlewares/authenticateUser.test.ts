import jwt from 'jsonwebtoken';
import axios from 'axios';
import { authenticateUser } from '../../middlewares/authenticateUser';
import { mockRequest, mockResponse, mockNext } from '../utils/mocks';

// Mock jwt
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

// Mock axios
jest.mock('axios', () => ({
  post: jest.fn(),
}));

// Mock config
jest.mock('../../config', () => ({
  JWT_SECRET: 'test-secret',
  ENV: 'development',
  ENVIRONMENTS: {
    development: {
      cookieSettings: {
        httpOnly: true,
        secure: false,
      },
      corsOrigin: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    },
  },
  SPOTIFY_CLIENT_ID: 'test-client-id',
  SPOTIFY_CLIENT_SECRET: 'test-client-secret',
}));

// Mock generateToken
jest.mock('../../utils/generateToken', () => ({
  generateToken: jest.fn().mockReturnValue('new-token'),
}));

// Mock logger
jest.mock('../../utils/logger', () => ({
  logLevels: {
    error: 'error',
    info: 'info',
    warn: 'warn',
  },
  logger: jest.fn(),
}));

describe('authenticateUser middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if authorization header is missing', async () => {
    // Arrange
    const req = mockRequest({ headers: {} });
    const res = mockResponse();
    const next = mockNext;

    // Act
    authenticateUser(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authorization header missing' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token verification fails', async () => {
    // Arrange
    const req = mockRequest({
      headers: { authorization: 'Bearer invalid-token' },
    });
    const res = mockResponse();
    const next = mockNext;

    // Mock jwt.verify to throw an error
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    // Act
    authenticateUser(req, res, next);

    // Wait for the async operation to complete
    await new Promise(process.nextTick);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() if token is valid and not expired', async () => {
    // Arrange
    const req = mockRequest({
      headers: { authorization: 'Bearer valid-token' },
    });
    const res = mockResponse();
    const next = mockNext;

    // Mock jwt.verify to return a valid token
    (jwt.verify as jest.Mock).mockReturnValue({
      access_token: 'valid-access-token',
      refreshToken: 'valid-refresh-token',
      expires_in: 3600,
      timestamp: Date.now(), // Not expired
      userId: 'user-123',
    });

    // Act
    authenticateUser(req, res, next);

    // Wait for the async operation to complete
    await new Promise(process.nextTick);

    // Assert
    expect(next).toHaveBeenCalled();
    expect(req.spotifyAuthData).toEqual({
      access_token: 'valid-access-token',
      refresh_token: 'valid-refresh-token',
      expires_in: 3600,
      timestamp: expect.any(Number),
      userId: 'user-123',
    });
  });

  it('should refresh token if access token is expired', async () => {
    // Arrange
    const req = mockRequest({
      headers: { authorization: 'Bearer expired-token' },
    });
    const res = mockResponse();
    const next = mockNext;

    // Mock jwt.verify to return an expired token
    (jwt.verify as jest.Mock).mockReturnValue({
      access_token: 'expired-access-token',
      refreshToken: 'valid-refresh-token',
      expires_in: 3600,
      timestamp: Date.now() - 4000000, // Expired (more than 3600 seconds ago)
      userId: 'user-123',
    });

    // Mock axios.post to return a new token
    (axios.post as jest.Mock).mockResolvedValue({
      status: 200,
      data: {
        access_token: 'new-access-token',
        expires_in: 3600,
      },
    });

    // Act
    authenticateUser(req, res, next);

    // Wait for the async operation to complete
    await new Promise(resolve => setTimeout(resolve, 100));

    // Assert
    expect(axios.post).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith('jams_token', 'new-token', expect.any(Object));
    expect(next).toHaveBeenCalled();
    expect(req.spotifyAuthData).toEqual({
      access_token: 'new-access-token',
      refresh_token: 'valid-refresh-token',
      expires_in: 3600,
      timestamp: expect.any(Number),
      userId: 'user-123',
    });
  });
});