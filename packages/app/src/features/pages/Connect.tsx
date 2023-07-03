import { Layout } from '@components/Layout'

const Connect = () => {
  const handleConnectClick = () => {
    window.location.href = 'http://localhost:3000/connect'
  }

  return (
    <Layout title="Connect">
      <div>Connect</div>
      <button onClick={handleConnectClick}>Connect to Spotify</button>
    </Layout>
  )
}

export default Connect
