// @ts-nocheck
import albumCoverFallback from '@assets/album-cover-fallback.svg'
import { useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const CustomiseTracks = () => {
  const {
    register,
    formState: { errors, isValid },
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useFormContext()

  const { fields } = useFieldArray({
    name: 'tracks',
    rules: {
      validate: (value) => {
        const checkedTracks = value.filter((track) => track.checked)
        return checkedTracks.length >= 2
      },
    },
    shouldUnregister: false,
  })

  useEffect(() => {
    const tracks = localStorage.getItem('JAMS_tracks')
    if (tracks) {
      setValue('tracks', JSON.parse(tracks))
    }
  }, [])

  useEffect(() => {
    watch((value) => {
      console.log('value', value)
      localStorage.setItem('JAMS_tracks', JSON.stringify(value.tracks))
    })
  }, [watch])

  const trackNumber = (index) => {
    return index + 1 < 10 ? `0${index + 1}` : index + 1
  }

  const selectedTracksCount = watch('tracks').filter(
    (track) => track.checked
  ).length

  useEffect(() => {
    if (selectedTracksCount < 2) {
      setError('tracks', {
        type: 'manual',
        message: 'Please select at least 2 songs for your playlist.',
      })
    } else {
      clearErrors('tracks')
    }
  }, [selectedTracksCount, setError, clearErrors])

  return (
    <>
      <div>
        <div className="mb-4 flex flex-wrap items-center md:justify-between">
          <h2 className="text-yale-blue basis-full text-2xl font-bold md:basis-auto">
            Customise Playlist
          </h2>
          <p className="text-sm">{selectedTracksCount} songs selected</p>
        </div>
        {fields.map((track, index) => (
          <div key={track.id} className="w-full">
            <input
              id={`tracks.${index}`}
              className="peer hidden"
              type="checkbox"
              {...register(`tracks.${index}.checked`)}
              defaultChecked={track.checked}
            />
            <label
              htmlFor={`tracks.${index}`}
              className={`flex cursor-pointer items-center border-b border-l-2 border-gray-300 px-2 py-2 text-sm peer-checked:border-l-blue-900 md:px-4 md:text-base`}
            >
              <span className="text-xs font-bold md:mr-2 md:text-sm">
                {trackNumber(index)}
              </span>
              <img
                src={track.albumCover ? track.albumCover : albumCoverFallback}
                alt={track.album}
                className="mx-3 h-12 w-12 rounded md:mx-4"
              />
              <span className="flex flex-col">
                <span className="text-sm font-bold md:text-base">
                  {track.title}
                </span>
                <span className="text-xs md:text-sm">{track.artist}</span>
              </span>
            </label>
          </div>
        ))}
        {errors.tracks && (
          <p className="mt-4 text-sm text-red-500">{errors.tracks.message}</p>
        )}
      </div>
    </>
  )
}

export default CustomiseTracks
