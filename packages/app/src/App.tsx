import { useRoutes } from 'react-router-dom'
import Landing from './features/app/Landing'

function App() {
  let element = useRoutes([
    {
      path: '/',
      element: <Landing />,
    },
  ])
  return element
}

export default App
