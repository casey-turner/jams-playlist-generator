import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
import { OPENAI_API_KEY } from '../config'
import { authenticateUser } from '../middlewares/authenticateUser'

const router = express.Router()
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

router.post('/playlist', authenticateUser('JWT_SECRET'), async (req, res) => {
  console.log('req', req)
  // const { accessToken } = req.userData
  const playlistPrompt = req.body.prompt
  const prompt = `Create a 2 song ${playlistPrompt} playlist. 
                  All playlist songs should be available on Spotify
                  and have the correct track title and artist. Also provide 5 creative / funny titles for the playlist. The
                  playlist and titles must be returned as a JSON object in the
                  following format { \"playlist\": [ { \"title\":
                  \"Bohemian Rhapsody\", \"artist\": \"Queen\"} ], \"playlistTitles\": [\"First playlist name option\", \"Second playlist name option\" ] }`

  openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.9,
    })
    .then((response) => {
      console.log('response', response)
    })
    .catch((error) => {
      console.log('error', error)
    })
})

//     .then((response) => {
//       const openaiResponseString = response.data.choices[0].text
//       // const openaiResponse = JSON.parse(openaiResponseString)
//       // const getSpotifyTrackData = openaiResponse.playlist.map((item) => {
//       //   return spotifyApi
//       //     .get('/search', {
//       //       params: {
//       //         q: `track:${item.title} artist:${item.artist}`,
//       //         type: 'track',
//       //         limit: 1,
//       //       },
//       //       headers: {
//       //         Authorization: `Bearer ${accessToken}`,
//       //       },
//       //     })
//       //     .then((response) => {
//       //       const trackData = response.data.tracks.items[0]
//       //       console.log(trackData.album.images[2].url)
//       //       const trackInfo = {
//       //         title: trackData.name,
//       //         uri: trackData.uri,
//       //         artist: trackData.artists[0].name,
//       //         album: trackData.album.name,
//       //         albumCover: trackData.album.images[1].url,
//       //       }

//       //       return trackInfo
//       //     })
//       //     .catch((error) => {
//       //       logger(logLevels.error, error.message, '/search', error)
//       //       return null
//       //     })
//       })

//       Promise.all(getSpotifyTrackData)
//         .then((response) => {
//           const filteredResponse = response.filter((item) => item !== null)
//           const tracks = {
//             tracks: filteredResponse,
//           }
//           const playlistTitles = openaiResponse.playlistTitles
//           res.status(200).json({
//             success: true,
//             playlist: tracks,
//             playlistTitles: playlistTitles,
//           })
//         })
//         .catch((error) => {
//           logger(logLevels.error, error.message, 'getSpotifyTrackData', error)
//           res.status(500).json({ message: 'Something went wrong' })
//         })
//     })
//     .catch((error) => {
//       logger(logLevels.error, error.message, 'openai.createCompletion', error)
//       res.status(500).json({ message: 'Something went wrong' })
//     })
// })

export default router
