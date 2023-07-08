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
        <div key={title}>
          {title === '' ? (
            <>
              <input
                id={`playlist-title-${index}`}
                type="radio"
                {...register('playlistTitle', { required: true })}
                value={title}
                checked={customTitleFocus && selectedPlaylistTitle === ''}
              />
              <label htmlFor={`playlist-title-${index}`}>
                <input
                  type="text"
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
                id={`playlist-title-${index}`}
                type="radio"
                {...register('playlistTitle', { required: true })}
                value={title}
              />
              <label htmlFor={`playlist-title-${index}`}>{title}</label>
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
