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
      navigate('/generate-playlist')
    }
  }

  return (
    <>
      <Layout>
        <div className="text-center lg:px-10  xl:px-40">
          <h1 className="font-this text-alice-blue mb-5 text-6xl uppercase">
            Discover Your Perfect Playlist
          </h1>
          <p className="text-alice-blue mb-10">
            Unleash the power of JAMS, where music meets AI technology! No more
            struggling to find the perfect playlist for your mood or favorite
            genre. With JAMS, simply input your desired music genre, and let AI
            curate a personalised playlist just for you, filled with handpicked
            tracks that match your taste.
          </p>
          <Button onClick={handleStart}>Get Started</Button>
        </div>
      </Layout>
    </>
  )
}

export default Landing
