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
import isAuth from '@utils/auth'
import { HelmetProvider } from 'react-helmet-async'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <HelmetProvider>
      <PlaylistDataProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connect" element={<Connect />} />

          {/* Protected Routes */}
          <Route path="/generate-playlist" element={isAuth() ? <GeneratePlaylist /> : <Connect /> } />
          <Route path="/customise-playlist" element={isAuth() ?
            <PlaylistFormProvider>
              <CustomisePlaylist />
            </PlaylistFormProvider>
            : <Connect />
          } />
          <Route path="/complete" element={isAuth() ? <Complete /> : <Connect />} />
          
          {/* Error Route */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </PlaylistDataProvider>
    </HelmetProvider>
  )
}

export default App
