import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

type CustomiseTitleProps = {
  playlistTitles: string[]
}

const CustomiseTitle = ({ playlistTitles }: CustomiseTitleProps) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const playlistTitlesWithEmptyValue = [...playlistTitles, '']

  const [customTitleFocus, setCustomTitleFocus] = useState(false)

  const selectedPlaylistTitle = watch('playlistTitle')
  const customTitle = watch('customTitle', '')

  return (
    <>
      {playlistTitlesWithEmptyValue.map((title, index) => (
        <div className="mb-4 flex w-full flex-col items-center" key={title}>
          {title === '' ? (
            <>
              <p className="mb-4 grid w-3/5 grid-cols-[minmax(20px,1fr)auto_minmax(20px,1fr)] items-center gap-4 text-center text-xl font-bold before:border-t-2 after:border-t-2">
                OR
              </p>
              <input
                id={`playlist-title-${index}`}
                className="peer hidden"
                type="radio"
                {...register('playlistTitle', { required: true })}
                value={title}
                checked={customTitleFocus && selectedPlaylistTitle === ''}
              />
              <label
                className="peer-checked:border-b-4 peer-checked:border-blue-400"
                htmlFor={`playlist-title-${index}`}
                className="w-3/4"
              >
                <input
                  type="text"
                  className="mx-auto w-full border-b-2 border-transparent border-b-gray-300 bg-transparent text-center text-3xl font-bold text-blue-400 focus:border-transparent focus:ring-0 peer-checked:border-b-4"
                  placeholder="Enter your own title"
                  {...register('customTitle')}
                  value={customTitle}
                  onFocus={() => {
                    setCustomTitleFocus(true)
                    setValue('playlistTitle', '')
                  }}
                />
              </label>
            </>
          ) : (
            <>
              <input
                className="peer hidden"
                id={`playlist-title-${index}`}
                type="radio"
                {...register('playlistTitle', { required: true })}
                value={title}
              />
              <label
                htmlFor={`playlist-title-${index}`}
                className={`peer-checked:underline-thickness-2 peer-checked:underline-gray-300 cursor-pointer text-3xl font-bold  peer-checked:text-blue-400 peer-checked:underline-offset-2`}
              >
                {`"${title}"`}
              </label>
            </>
          )}
        </div>
      ))}
      {errors && errors.playlistTitle && (
        <span style={{ color: 'red' }}>
          Please select or enter a playlist title.
        </span>
      )}
    </>
  )
}

export default CustomiseTitle
