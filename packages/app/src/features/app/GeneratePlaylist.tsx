import { Head } from '@components/Head'
import GeneratePlaylistForm from '@features/playlist/components/GeneratePlaylistForm'

const GeneratePlaylist = () => {
  return (
    <>
      <Head title="Generate Playlist" description="Generate Playlist" />
      <div>Generate</div>
      <GeneratePlaylistForm />
    </>
  )
}

export default GeneratePlaylist
