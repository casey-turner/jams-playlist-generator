import SpotifyLogo from '@assets/spotify.svg'
import { Button } from '@components/Button'
import { Layout } from '@components/Layout'

const Connect = () => {
  const handleConnectClick = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/connect`
  }

  return (
    <Layout title="Connect">
      <div className="flex flex-col items-center">
        <img src={SpotifyLogo} alt="Spotify Logo" className="mb-4 h-52 w-52" />
        <h1 className="mb-8 text-6xl font-bold">Connect your Spotify</h1>
        <p className="mb-5 w-1/2 text-center text-xl">
          Amplify your playlist creating experience by connecting your Spotify
          account, enabling JAMS to seamlessly save your custom curated
          playlists direcly to your account.
        </p>
        <Button onClick={handleConnectClick}>Connect to Spotify</Button>
        <p className="mt-10 w-[550px] text-center text-xs">
          By connecting, you acknowledge that you have read and understood the
          Privacy and Cookie Policy, and consent to the processing of your data
          and the use of cookies in accordance with its terms.
        </p>
      </div>
    </Layout>
  )
}

export default Connect
