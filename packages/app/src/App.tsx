import { Route, Routes } from 'react-router-dom'

import About from '@features/pages/About'
import Complete from '@features/pages/Complete'
import Connect from '@features/pages/Connect'
import Contact from '@features/pages/Contact'
import CustomisePlaylist from '@features/pages/CustomisePlaylist'
import Error404 from '@features/pages/Error404'
import GeneratePlaylist from '@features/pages/GeneratePlaylist'
import Landing from '@features/pages/Landing'
import { PlaylistDataProvider } from '@features/playlist/context/PlaylistDataContext'
import { PlaylistFormProvider } from '@features/playlist/context/PlaylistFormContext'

import { HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <HelmetProvider>
      <PlaylistDataProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/generate-playlist" element={<GeneratePlaylist />} />
          <Route
            path="/customise-playlist"
            element={
              <PlaylistFormProvider>
                <CustomisePlaylist />
              </PlaylistFormProvider>
            }
          />
          <Route path="/complete" element={<Complete />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </PlaylistDataProvider>
    </HelmetProvider>
  )
}

export default App
