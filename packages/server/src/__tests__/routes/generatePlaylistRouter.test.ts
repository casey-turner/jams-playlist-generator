import express from 'express';
import request from 'supertest';
import bodyParser from 'body-parser';
import generatePlaylistRouter from '../../routes/generatePlaylistRouter';
import { authenticateUser } from '../../middlewares/authenticateUser';

// Mock the authenticateUser middleware
jest.mock('../../middlewares/authenticateUser', () => ({
  authenticateUser: jest.fn((req, res, next) => {
    req.spotifyAuthData = {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      expires_in: 3600,
      timestamp: Date.now(),
      userId: 'mock-user-id',
    };
    next();
  }),
}));

// Mock the generatePlaylist controller
jest.mock('../../controllers/generatePlaylistController', () => ({
  generatePlaylist: jest.fn((req, res) => {
    res.status(200).json({
      success: true,
      playlist: [
        {
          title: 'Track Name',
          uri: 'spotify:track:123456',
          artist: 'Artist Name',
          album: 'Album Name',
          albumCover: 'medium-image-url',
        },
      ],
      playlistTitles: [
        { title: 'Playlist Title 1' },
        { title: 'Playlist Title 2' },
        { title: 'Playlist Title 3' },
        { title: 'Playlist Title 4' },
        { title: 'Playlist Title 5' },
      ],
    });
  }),
}));

describe('generatePlaylistRouter', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(generatePlaylistRouter);
  });

  it('should call authenticateUser middleware for /playlist endpoint', async () => {
    // Arrange & Act
    await request(app)
      .post('/playlist')
      .send({
        data: {
          genres: ['rock', 'pop'],
          numberOfSongs: 3,
        },
      });

    // Assert
    expect(authenticateUser).toHaveBeenCalled();
  });

  it('should return 200 and playlist data for valid request', async () => {
    // Arrange & Act
    const response = await request(app)
      .post('/playlist')
      .send({
        data: {
          genres: ['rock', 'pop'],
          numberOfSongs: 3,
        },
      });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      playlist: [
        {
          title: 'Track Name',
          uri: 'spotify:track:123456',
          artist: 'Artist Name',
          album: 'Album Name',
          albumCover: 'medium-image-url',
        },
      ],
      playlistTitles: [
        { title: 'Playlist Title 1' },
        { title: 'Playlist Title 2' },
        { title: 'Playlist Title 3' },
        { title: 'Playlist Title 4' },
        { title: 'Playlist Title 5' },
      ],
    });
  });
});