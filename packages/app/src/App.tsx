import Connect from '@features/app/Connect'
import CustomisePlaylist from '@features/app/CustomisePlaylist'
import GeneratePlaylist from '@features/app/GeneratePlaylist'
import Landing from '@features/app/Landing'
import { useRoutes } from 'react-router-dom'

function App() {
  let element = useRoutes([
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
      element: <CustomisePlaylist />,
    },
  ])
  return element
}

export default App
