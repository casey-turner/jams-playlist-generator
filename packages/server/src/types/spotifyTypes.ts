export type SpotifyAuthData = {
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
  timestamp: number,
  userId: string,
}

export type RefreshTokenResult = {
  accessToken: string;
  expiresIn: number;
  error?: string;
}