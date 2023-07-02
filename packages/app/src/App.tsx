import About from '@/features/pages/About'
import Connect from '@/features/pages/Connect'
import CustomisePlaylist from '@/features/pages/CustomisePlaylist'
import GeneratePlaylist from '@/features/pages/GeneratePlaylist'
import Landing from '@/features/pages/Landing'
import { Route, Routes } from 'react-router-dom'
import { CustomisePlaylistFormProvider } from './features/playlist/context/CustomisePlaylistFormContext'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/generate-playlist" element={<Connect />} />
      <Route path="/connect" element={<GeneratePlaylist />} />
      <Route
        path="/connect"
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
