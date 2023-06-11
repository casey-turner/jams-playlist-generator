import { SpotifyAuthData } from "./spotifyAuthData"

declare global {
  namespace Express {
    export interface Request {
      spotifyAuthData?: SpotifyAuthData;
    }
  }
}