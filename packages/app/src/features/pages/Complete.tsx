import successAnimation from '@assets/animations/success.json'
import { Button } from '@components/Button'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { Loading } from '@components/Loading'
import { Section } from '@components/Section'
import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Complete = () => {
  const [playlistId, setPlaylistId] = useState('')
  const [animationComplete, setAnimationComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFade, setIsFade] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedPlaylistId = localStorage.getItem('Jams_playlist_id')
    if (storedPlaylistId) {
      // time out to simulate loading
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 5000)

      // time out to simulate fade in
      setTimeout(() => {
        setIsFade(true)
      }, 5800)

      setPlaylistId(storedPlaylistId)
    }
  }, [])

  const handleMakeAnother = () => {
    localStorage.removeItem('Jams_playlist_id')
    localStorage.removeItem('Jams_tracks')
    localStorage.removeItem('Jams_playlist_titles')
    navigate('/generate-playlist')
  }

  return (
    <>
      <Layout title="Complete">
        <Section sectionStyle="contentTop">
          <Container>
            {isLoading && (
              <Loading
                title="Brb, making music magic"
                copy="Creating your playlist in Spotify..."
              />
            )}
            {playlistId && !isLoading && (
              <>
                <div className="relative">
                  {!animationComplete && (
                    <Lottie
                      style={{
                        zIndex: 10,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      animationData={successAnimation}
                      loop={false}
                      onComplete={() => {
                        setAnimationComplete(true)
                      }}
                    />
                  )}
                  <div
                    className={`duration-1000, flex flex-col items-center transition-opacity ${
                      !isFade ? 'opacity-0' : 'opacity-100'
                    } `}
                  >
                    <iframe
                      className="h-[380px] md:w-[500px]"
                      src={`https://open.spotify.com/embed/playlist/${playlistId}`}
                      allow="encrypted-media"
                    ></iframe>
                    <div className="mt-5 flex gap-x-4">
                      <Button>
                        <a
                          href={`https://open.spotify.com/playlist/${playlistId}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Listen on Spotify
                        </a>
                      </Button>
                      <Button onClick={handleMakeAnother}>Make Another</Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Container>
        </Section>
      </Layout>
    </>
  )
}

export default Complete
