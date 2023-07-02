import About from '@features/pages/About'
import Connect from '@features/pages/Connect'
import CustomisePlaylist from '@features/pages/CustomisePlaylist'
import GeneratePlaylist from '@features/pages/GeneratePlaylist'
import Landing from '@features/pages/Landing'
import { CustomisePlaylistFormProvider } from '@features/playlist/context/CustomisePlaylistFormContext'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/generate-playlist" element={<GeneratePlaylist />} />
      <Route
        path="/customise-playlist"
        element={
          <CustomisePlaylistFormProvider>
            <CustomisePlaylist />
          </CustomisePlaylistFormProvider>
        }
      />
    </Routes>
  )
}
export default App
