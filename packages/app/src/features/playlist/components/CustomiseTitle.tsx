// @ts-nocheck
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const CustomiseTitle = () => {
  const {
    register,
    formState: { errors },
    watch,
    getValues,
    setValue,
  } = useFormContext()

  const [customTitleSelected, setCustomTitleSelected] = useState(false)

  const { fields } = useFieldArray({
    name: 'playlistTitles',
  })

  useEffect(() => {
    watch((value, { name, type }) => console.log(value, name, type))
  }, [watch])

  useEffect(() => {
    const tracks = localStorage.getItem('JAMS_playlist_titles')
    if (tracks) {
      setValue('playlistTitles', JSON.parse(tracks))
    }
  }, [])

  useEffect(() => {
    watch((value, { name, type }) =>
      localStorage.setItem(
        'JAMS_playlist_titles',
        JSON.stringify(value.playlistTitles)
      )
    )
    watch((value, { name, type }) => console.log(value, name, type))
  }, [watch])

  const selectedPlaylistTitle = watch('playlistTitles.title')
  const customTitle = watch('playlistTitles.custom')

  return (
    <>
      <div className="flex flex-col items-center space-y-6">
        {fields.map((title, index) => (
          <div key={title.id}>
            <input
              id={`playlistTitles.${index}.title`}
              className="peer"
              type="radio"
              value={title.title}
              {...register(`playlistTitles.title`)}
              onChange={(e) => {
                setCustomTitleSelected(false)
              }}
            />
            <label
              htmlFor={`playlistTitles.${index}.title`}
              className={`peer-checked:underline-thickness-2 peer-checked:underline-gray-300 cursor-pointer text-3xl font-bold  peer-checked:text-blue-400 peer-checked:underline-offset-2`}
            >
              {`"${title.title}"`}
            </label>
          </div>
        ))}
        <div className="w-full max-w-[550px]">
          <p className="mb-4 grid grid-cols-[minmax(20px,1fr)auto_minmax(20px,1fr)] items-center gap-4 text-center text-xl font-bold before:border-t-2 after:border-t-2">
            OR
          </p>
        </div>
        <div>
          <input
            className="peer"
            type="radio"
            value={customTitle}
            {...register(`playlistTitles.title`)}
            checked={customTitleSelected}
            onChange={(e) => {
              setValue('playlistTitles.title', customTitle)
            }}
          />
          <label
            htmlFor="customPlaylistTitle"
            className="border-b-4 text-3xl peer-checked:text-blue-400"
          >
            <input
              className="mx-auto w-full cursor-pointer border-0 border-transparent bg-transparent text-center text-3xl font-bold focus:ring-0"
              type="text"
              name="customPlaylistTitle"
              placeholder="Enter your own title"
              {...register(`playlistTitles.custom`)}
              onChange={(e) => {
                setValue('playlistTitles.title', e.target.value)
              }}
              onFocus={(e) => {
                setCustomTitleSelected(true)
                setValue('playlistTitles.title', e.target.value)
              }}
            />
          </label>
        </div>
      </div>
    </>
  )
}

export default CustomiseTitle
