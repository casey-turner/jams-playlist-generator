// import express from 'express'
// import {
//   addTracksToPlaylist,
//   createPlaylist,
//   getSongUris,
// } from '../controllers/createPlaylistController.js'
// import { authenticateUser } from '../middlewares/authenticateUser.js'
// import { logLevels, logger } from '../utils/logger.js'

// const router = express.Router()
// const jwtSecret = process.env.JWT_SECRET

// // Create playlist endpoint
// router.post('/create-playlist', authenticateUser(jwtSecret), (req, res) => {
//   const { accessToken, userId } = req.userData
//   const { tracks, playlistTitle } = req.body

//   const playlistOptions = {
//     name: playlistTitle,
//     description: 'A playlist created with the Spotify API!',
//     public: false,
//   }

//   // Create a new playlist
//   createPlaylist(accessToken, userId, playlistOptions)
//     .then((playlist) => {
//       const playlistId = playlist.id
//       const uris = getSongUris(tracks)
//       addTracksToPlaylist(accessToken, playlistId, uris)
//         .then((response) => {
//           logger(
//             logLevels.info,
//             'Playlist created successfully',
//             '/create-playlist',
//             response
//           )
//           res.status(200).json({ message: 'Playlist created successfully' })
//         })
//         .catch((error) => {
//           logger(logLevels.error, error.message, 'addTracksToPlaylist', error)
//           res.status(500).json({ message: 'Something went wrong' })
//         })
//     })
//     .catch((error) => {
//       logger(logLevels.error, error.message, '/create-playlist', error)
//       res.status(500).json({ message: 'Something went wrong' })
//     })
// })
// export default router
