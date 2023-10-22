//@ts-nocheck
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
    name: 'playlistTitle',
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
  console.log('errors', errors)
  // console.log('watch', watch('playlistTitle'))
  // console.log('getValues', getValues('playlistTitle'))
  // console.log('fields', fields)

  return (
    <>
      <div className="flex flex-col items-center space-y-3 md:space-y-6">
        <div className="mb-4 flex flex-wrap items-center md:justify-between">
          <h2 className="text-yale-blue basis-full text-2xl font-bold md:basis-auto">
            Customise Title
          </h2>
        </div>
        {fields.map((title, index) => (
          <div className="text-center" key={title.id}>
            <input
              id={title.id}
              className="peer opacity-0"
              type="radio"
              {...register(`playlistTitle`)}
              value={title.title}
              onChange={(e) => {
                setCustomTitleSelected(false)
              }}
            />
            <label
              htmlFor={title.id}
              className={`peer-checked:underline-thickness-2 peer-checked:underline-yale-blue peer-checked:text-yale-blue text-paynes-gray cursor-pointer text-xl font-bold peer-checked:underline peer-checked:underline-offset-2 md:text-2xl lg:text-3xl`}
            >
              {`"${title.title}"`}
            </label>
          </div>
        ))}
        <div className="w-full max-w-[550px]">
          <p className="mb-4 grid grid-cols-[minmax(20px,1fr)auto_minmax(20px,1fr)] items-center gap-4 text-center text-base font-bold before:border-t-2 after:border-t-2 md:text-xl">
            OR
          </p>
        </div>
        <div>
          <input
            id="playlistTitle-custom"
            className="peer opacity-0"
            type="radio"
            {...register(`playlistTitle`)}
            checked={customTitleSelected}
          />
          <label
            htmlFor="customPlaylistTitle"
            className="sr-only border-b-4 text-3xl"
          >
            Enter your own title
          </label>
          <input
            id="customPlaylistTitle"
            className={
              'placeholder:text-paynes-gray mx-auto w-full cursor-pointer border-0 border-transparent bg-transparent text-center text-xl font-bold focus:ring-0 md:text-2xl lg:text-3xl' +
              (customTitleSelected
                ? 'text-yale-blue underline'
                : 'text-paynes-gray no-underline')
            }
            type="text"
            placeholder="Enter your own title"
            {...register(`customPlaylistTitle`)}
            onChange={(e) => {
              setValue('playlistTitle', e.target.value)
            }}
            onFocus={(e) => {
              setValue('playlistTitle', e.target.value)
              setCustomTitleSelected(true)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default CustomiseTitle
