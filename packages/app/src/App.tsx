import Connect from '@features/app/Connect'
import CustomisePlaylist from '@features/app/CustomisePlaylist'
import GeneratePlaylist from '@features/app/GeneratePlaylist'
import Landing from '@features/app/Landing'
import { useRoutes } from 'react-router-dom'
import { CustomisePlaylistFormProvider } from './features/playlist/context/CustomisePlaylistFormContext'

function App() {
  const element = useRoutes([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: 'connect',
      element: <Connect />,
    },
    {
      path: 'generate-playlist',
      element: <GeneratePlaylist />,
    },
    {
      path: 'customise-playlist',
      element: (
        <CustomisePlaylistFormProvider>
          <CustomisePlaylist />
        </CustomisePlaylistFormProvider>
      ),
    },
  ])
  return element
}

export default App
