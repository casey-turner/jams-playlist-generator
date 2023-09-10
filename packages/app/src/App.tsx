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
import { hasPlaylist, isComplete } from '@utils/playlistStorageUtils'
import { HelmetProvider } from 'react-helmet-async'
import { Navigate, Route, Routes, useMatch } from 'react-router-dom'

function App() {
  const completePage = useMatch('/complete')
  const customisePage = useMatch('/customise-playlist')
  const generatePage = useMatch('/generate-playlist')

  const handleProtectedRoutes = () => { 
    if (!isAuth()) {
      if (generatePage || customisePage || completePage) {
        return <Navigate to="/connect" />
      }      
    } else if (!hasPlaylist() && completePage || customisePage) {
        return <Navigate to="/generate-playlist" />
    } else if (!isComplete() && completePage) {
        return <Navigate to="/customise-playlist" />
    }
  }
  

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
          <Route path="/generate-playlist" element={isAuth() ? <GeneratePlaylist /> : handleProtectedRoutes() } />
          <Route path="/customise-playlist" element={isAuth() && hasPlaylist() ?
            <PlaylistFormProvider>
              <CustomisePlaylist />
            </PlaylistFormProvider>
            : handleProtectedRoutes()
          } />
          <Route path="/complete" element={isAuth() && isComplete() ? <Complete /> : handleProtectedRoutes()} />
          
          {/* Error Route */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </PlaylistDataProvider>
    </HelmetProvider>
  )
}

export default App
