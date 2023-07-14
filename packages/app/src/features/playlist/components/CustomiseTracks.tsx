// @ts-nocheck
import albumCoverFallback from '@assets/album-cover-fallback.png'
import { useFieldArray, useFormContext } from 'react-hook-form'

const CustomiseTracks = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext()

  const { fields } = useFieldArray({
    name: 'tracks',
    rules: {
      validate: (value) => {
        const checkedTracks = value.filter((track) => track.checked)
        return checkedTracks.length >= 2
      },
    },
  })

  const trackNumber = (index) => {
    return index + 1 < 10 ? `0${index + 1}` : index + 1
  }

  const selectedTracksCount = watch('tracks').filter(
    (track) => track.checked
  ).length

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">Customise Tracks</h2>
        <p className="mb-4 text-sm">{selectedTracksCount} tracks selected</p>

        {fields.map((track, index) => (
          <div key={track.uri}>
            <input
              id={`tracks.${index}`}
              className="peer hidden"
              type="checkbox"
              {...register(`tracks.${index}.checked`)}
              defaultChecked={track.checked}
            />
            <label
              htmlFor={`tracks.${index}`}
              className={`flex cursor-pointer items-center border-b border-l-2 border-gray-300 px-4 py-2 peer-checked:border-l-blue-900`}
            >
              <span className="mr-2 text-sm font-bold">
                {trackNumber(index)}
              </span>
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
      </div>
    </>
  )
}

export default CustomiseTracks
