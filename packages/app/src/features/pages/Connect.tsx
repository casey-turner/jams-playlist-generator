import SpotifyLogo from '@assets/spotify.svg'
import { Button } from '@components/Button'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { Section } from '@components/Section'

const Connect = () => {
  const handleConnectClick = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/connect`
  }

  return (
    <Layout title="Connect">
      <Section>
        <Container>
          <div className="flex flex-col items-center lg:px-10  xl:px-40">
            <img
              src={SpotifyLogo}
              alt="Spotify Logo"
              className="mb-4 h-32 w-32"
            />
            <h1 className="font-poppins mb-4 text-4xl font-extrabold">
              Connect your Spotify
            </h1>
            <p className="font-poppins mb-5 text-center text-lg">
              Amplify your playlist creating experience by connecting your
              Spotify account, enabling JAMS to seamlessly save your custom
              curated playlists direcly to your account.
            </p>
            <Button onClick={handleConnectClick}>Connect to Spotify</Button>
            <p className="font-poppins mt-10 text-center text-xs">
              By connecting you acknowledge that you have read and understood
              the Privacy and Cookie Policy, and consent to the processing of
              your data and the use of cookies in accordance with its terms.
            </p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}

export default Connect
