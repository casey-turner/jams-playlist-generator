// @ts-nocheck
import albumCoverFallback from '@assets/album-cover-fallback.svg'
import { useFormContext } from 'react-hook-form'

const CustomiseTracks = ({ tracks }) => {
  const {
    register,
    formState: { errors },
    getValues,
    trigger,
    setValue,
  } = useFormContext()

  const selectedTracks = getValues('tracks')

  const handleTrackChange = (event) => {
    const selectedTrack = event.target.value
    const updatedTracks = selectedTracks.includes(selectedTrack)
      ? selectedTracks.filter((track) => track !== selectedTrack)
      : [...selectedTracks, selectedTrack]

    setValue('tracks', updatedTracks)
    trigger('tracks') // Trigger validation for the 'tracks' field
  }

  const trackNumber = (track) => {
    const index = tracks.findIndex((t) => t.title === track.title)
    return index + 1 < 10 ? `0${index + 1}` : index + 1
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-2xl font-bold">Customise your playlist</h2>
        {selectedTracks && <p>{selectedTracks.length} songs</p>}
      </div>

      {tracks.map((track) => (
        <div key={track.title}>
          <input
            id={track.uri}
            className="peer hidden"
            type="checkbox"
            {...register(`tracks`, { required: true })}
            value={track.uri}
            checked={
              selectedTracks !== undefined
                ? selectedTracks.includes(track.uri)
                : true
            }
            onChange={handleTrackChange}
          />
          <label
            htmlFor={track.uri}
            className={`flex cursor-pointer items-center border-b border-l-2 border-gray-300 px-4 py-2 peer-checked:border-l-blue-900`}
          >
            <span className="mr-2 text-sm font-bold">{trackNumber(track)}</span>
            <img
              src={track.albumCover ? track.albumCover : albumCoverFallback}
              alt={track.album}
              className="mx-4 h-12 w-12 rounded"
            />
            <span className="flex flex-col">
              <span className="font-bold">{track.title}</span>
              <span className="text-sm">{track.artist}</span>
            </span>
          </label>
        </div>
      ))}
      {errors && errors.tracks && (
        <span style={{ color: 'red' }}>Please select at least one track.</span>
      )}
    </div>
  )
}

export default CustomiseTracks
