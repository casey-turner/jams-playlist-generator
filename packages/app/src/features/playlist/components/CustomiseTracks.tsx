import useCustomisePlaylistFormContext from '../hooks/usePlaylistFormContext'

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
  const { data, setData, handleChange } = useCustomisePlaylistFormContext()

  console.log('data', data)

  return (
    <>
      <fieldset>
        {tracks &&
          tracks.map((track) => (
            <div>
              <input
                type="checkbox"
                name={track.title}
                onChange={handleChange}
              />
              <label htmlFor="">{track.title}</label>
            </div>
          ))}
      </fieldset>
    </>
  )
}

export default CustomiseTracks
