// @ts-nocheck
import usePlaylistFormContext from '../hooks/usePlaylistFormContext'

type Track = {
  title?: string
  artist?: string
  album?: string
  albumCover?: string
}

type CustomiseTracksProps = {
  tracks: Track[]
}

const CustomiseTracks = ({ tracks }: CustomiseTracksProps) => {
  const { selectedTracks, setSelectedTracks } = usePlaylistFormContext()

  //if checked add to selectedTracks
  //if unchecked remove from selectedTracks
  const toggleCheckbox = (event) => {
    const name = event.target.name
    const checked = event.target.checked

    if (checked) {
      const track = tracks.find((track) => track.title === name)
      setSelectedTracks([...selectedTracks, track])
    } else {
      const filteredTracks = selectedTracks.filter(
        (track) => track.title !== name
      )
      setSelectedTracks(filteredTracks)
    }
  }

  return (
    <>
      <fieldset>
        {tracks &&
          tracks.map((track) => (
            <div key={track.title}>
              <input
                type="checkbox"
                id={track.title}
                name={track.title}
                defaultChecked="checked"
                checked={selectedTracks.includes(TrackEvent)}
                onChange={toggleCheckbox}
              />
              <label htmlFor={track.title}>{track.title}</label>
            </div>
          ))}
      </fieldset>
    </>
  )
}

export default CustomiseTracks
