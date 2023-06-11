import { SpotifyAuthData } from "./spotifyTypes"

declare global {
  namespace Express {
    export interface Request {
      spotifyAuthData?: SpotifyAuthData;
    }
  }
}