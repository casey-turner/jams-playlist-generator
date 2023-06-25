import { Head } from '@components/Head'
import CustomisePlaylistForm from '@features/playlist/components/CustomisePlaylistForm'

const CustomisePlaylist = () => {
  return (
    <>
      <Head title="Customise Playlist" description="Customise Playlist" />
      <div>Customise</div>
      <CustomisePlaylistForm />
    </>
  )
}

export default CustomisePlaylist
