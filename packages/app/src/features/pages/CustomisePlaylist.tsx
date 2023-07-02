import { Layout } from '@components/Layout'
import CustomisePlaylistForm from '@features/playlist/components/CustomisePlaylistForm'

const CustomisePlaylist = () => {
  return (
    <>
      <Layout title="Customise Playlist">
        <div>Customise</div>
        <CustomisePlaylistForm />
      </Layout>
    </>
  )
}

export default CustomisePlaylist
