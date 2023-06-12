export type PlaylistGenerationRequest = {
  prompt: string; // Music genre supplied by the user
  // TODO add other properties related to playlist generation
}

export type OpenAiResponse = { 
  playlist?: Array<{ title: string, artist: string }>;
  playlistTitles?: string[];
}

export type SpotifyTrackData = {
  name: string;
  uri: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
}

export type PlaylistCreationRequest = {
  tracks: PlaylistTrack[];
  playlistTitle: string;
}

export type PlaylistTrack = {
  title: string;
  uri: string;
  artist: string;
  album: string;
  albumCover: string;
}