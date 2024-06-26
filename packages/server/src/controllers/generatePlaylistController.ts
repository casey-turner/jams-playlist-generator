import { Request, Response } from 'express'
import { OpenAI } from 'openai'
import { spotifyApi } from '../apis/spotifyApi'
import { OPENAI_API_KEY } from '../config'
import {
  OpenAiResponse,
  PlaylistGenerationRequest,
  SpotifyTrackData,
} from '../types/playlistTypes'
import { logLevels, logger } from '../utils/logger'

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

const generatePlaylist = async (req: Request, res: Response) => {
  try {
    if (!req.spotifyAuthData) {
      throw new Error('Spotify authentication data is missing.')
    }
    const accessToken: string = req.spotifyAuthData.access_token
    const requestData  = req.body as PlaylistGenerationRequest
  
    const openAIResponse = await generateOpenAIResponse(requestData)

    if (!openAIResponse) {
      throw new Error('OpenAI response is missing.')
    }

    const { playlist, playlistTitles } = openAIResponse

    if (!playlist || !playlistTitles) {
      throw new Error('OpenAI response is missing playlist or playlistTitles.')
    }

    const playlistData = await getSpotifyTracks(
      accessToken,
      playlist,
      playlistTitles
    )

    res.status(200).json(playlistData)
  } catch (error) {
    console.error(error)
    logger(logLevels.error, 'generate playlist failed', '/playlist', error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const generateOpenAIResponse = async (data: PlaylistGenerationRequest) => {
  const { genres, numberOfSongs } = data.data

  const openaiPrompt = `You are an incredible Playlist Generation Tool, here to help users discover some awesome bands or singers based on their favorite music genres. Please provide a list of ${numberOfSongs} bands and/or singers of the following genres: ${genres.join(
    ', '
  )}. Include well-known and lesser-known artists in order to create a comprehensive list. Do not repeat artists. All bands/artists should be available on Spotify. Additionally, suggest 5 playlist titles that are humorous but maintain a non-offensive tone for these afrobeat artists. The titles should reflect the unique characteristics or themes associated with the genre/s. The playlist and titles must be returned as a JSON object in the following format { "playlist": [ {"artist": "Queen"}, {"artist": "AC/DC"} ], "playlistTitles": [ {"title":"First playlist name option"}, {"title":"Second playlist name option"} ] }`

  const aiCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: 'system',
        content: openaiPrompt,
      },
    ],
  });

  const text =  aiCompletion.choices[0]?.message?.content
  const openaiResponse =
    text ? (JSON.parse(text) as OpenAiResponse) : null
  return openaiResponse
}

const getSpotifyTracks = async (
  accessToken: string,
  playlist: Array<{ artist: string }>,
  playlistTitles: string[]
) => {
  const getSpotifyTrackDataPromises = playlist.map((item) => {
    return spotifyApi.get('/search', {
      params: {
        q: `artist:${item.artist}`,
        type: 'track',
        limit: 10,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  })

  const getSpotifyTrackData = await Promise.all(getSpotifyTrackDataPromises)

  const tracks = getSpotifyTrackData.map(
    (item: { data: { tracks: { items: SpotifyTrackData[] } } }) => {
      if (item && item.data.tracks.items.length > 0) {
        const trackData = item.data.tracks.items[0]

        return {
          title: trackData.name,
          uri: trackData.uri,
          artist: trackData.artists[0].name,
          album: trackData.album.name,
          albumCover: trackData.album.images[1].url,
        }
      }

      return null
    }
  )

  const filteredTracks = tracks.filter((track) => track !== null)
  const playlistData = {
    success: true,
    playlist: filteredTracks,
    playlistTitles: playlistTitles,
  }

  return playlistData
}
export { generatePlaylist }

