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
    const customTitle = localStorage.getItem('JAMS_custom_title')
    if (customTitle) {
      setValue('customPlaylistTitle', JSON.parse(customTitle))
    }
  }, [])

  useEffect(() => {
    watch((value, { customPlaylistTitle }) => {
      console.log('value', customPlaylistTitle)
      // localStorage.setItem(
      //   'JAMS_custom_title',
      //   JSON.stringify(value.customPlaylistTitle)
      // )
    })
  }, [watch])

  console.log('watch', watch('playlistTitles'))
  console.log('getValues', getValues('playlistTitles'))

  console.log('fields', fields)
  return (
    <>
      <div className="flex flex-col items-center space-y-6">
        {fields.map((title, index) => (
          <div key={title.id}>
            <input
              id={title.id}
              className="peer"
              type="radio"
              {...register(`playlistTitles`)}
              value={title.title}
              onChange={(e) => {
                setCustomTitleSelected(false)
              }}
            />
            <label
              htmlFor={title.id}
              className={`peer-checked:underline-thickness-2 peer-checked:underline-gray-300 cursor-pointer text-3xl font-bold  peer-checked:text-blue-400 peer-checked:underline-offset-2`}
            >
              {`"${title.index}"`}
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
            id="playlistTitles-custom"
            className="peer"
            type="radio"
            {...register(`playlistTitles`)}
            checked={customTitleSelected}
          />
          <label
            htmlFor="customPlaylistTitle"
            className="sr-only border-b-4 text-3xl peer-checked:text-blue-400"
          >
            Enter your own title
          </label>
          <input
            id="customPlaylistTitle"
            className="mx-auto w-full cursor-pointer border-0 border-transparent bg-transparent text-center text-3xl font-bold focus:ring-0"
            type="text"
            name="customPlaylistTitle"
            placeholder="Enter your own title"
            {...register(`customPlaylistTitle`)}
            onChange={(e) => {
              setValue('playlistTitles', e.target.value)
            }}
            onFocus={(e) => {
              setValue('playlistTitles', e.target.value)
              setCustomTitleSelected(true)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default CustomiseTitle
