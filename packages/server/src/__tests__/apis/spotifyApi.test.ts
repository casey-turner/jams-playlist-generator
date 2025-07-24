import axios from 'axios';
import { spotifyApi, spotifyTokenApi } from '../../apis/spotifyApi';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn().mockReturnValue({
    baseURL: '',
    headers: {},
  }),
}));

// Mock config
jest.mock('../../config', () => ({
  SPOTIFY_CLIENT_ID: 'test-client-id',
  SPOTIFY_CLIENT_SECRET: 'test-client-secret',
}));

describe('spotifyApi', () => {
  it('should create an axios instance with the correct baseURL', () => {
    // Assert
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://api.spotify.com/v1',
    });
  });

  it('should export the spotifyApi instance', () => {
    // Assert
    expect(spotifyApi).toBeDefined();
  });
});

describe('spotifyTokenApi', () => {
  it('should create an axios instance with the correct baseURL and headers', () => {
    // Assert
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: expect.stringContaining('Basic '),
      },
    });
  });

  it('should export the spotifyTokenApi instance', () => {
    // Assert
    expect(spotifyTokenApi).toBeDefined();
  });
});