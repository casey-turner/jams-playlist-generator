import { Button } from '@components/Button'
import { Layout } from '@components/Layout'
import isAuth from '@utils/auth'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  const handleStart = () => {
    if (!isAuth()) {
      navigate('/connect')
    } else {
      navigate('/generate')
    }
  }

  return (
    <>
      <Layout>
        <div className="container mx-auto flex flex-col items-center justify-center px-4">
          <h1 className="text-9xl">JAMS</h1>
          <Button onClick={handleStart}>Get Started</Button>
        </div>
      </Layout>
    </>
  )
}

export default Landing
