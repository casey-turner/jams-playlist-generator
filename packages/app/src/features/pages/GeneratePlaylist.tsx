import { Layout } from '@components/Layout'
import GeneratePlaylistForm from '@features/playlist/components/GeneratePlaylistForm'

const GeneratePlaylist = () => {
  return (
    <>
      <Layout>
        <div>Generate</div>
        <GeneratePlaylistForm />
      </Layout>
    </>
  )
}

export default GeneratePlaylist
