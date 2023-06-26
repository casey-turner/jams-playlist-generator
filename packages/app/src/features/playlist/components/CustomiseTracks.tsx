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
  return (
    <>
      <fieldset>
        {tracks &&
          tracks.map((track) => (
            <div>
              <input type="checkbox" name={track.title} />
              <label htmlFor="">{track.title}</label>
            </div>
          ))}
      </fieldset>
    </>
  )
}

export default CustomiseTracks
