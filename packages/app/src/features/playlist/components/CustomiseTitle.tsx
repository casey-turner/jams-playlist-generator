// @ts-nocheck
import { useFieldArray, useFormContext } from 'react-hook-form'

const CustomiseTitle = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const { fields } = useFieldArray({
    name: 'playlistTitles',
  })

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">Customise Title</h2>
        <p className="mb-4 text-sm">Choose a title for your playlist</p>
        {fields.map((playlistTitle, index) => (
          <div key={playlistTitle.id}>
            <>
              <input
                id={`playlistTitles.${index}`}
                className="peer"
                type="radio"
                {...register(`playlistTitles.title`)}
              />
              <label
                htmlFor={`playlistTitles.${index}`}
                className={`flex cursor-pointer items-center border-b border-l-2 border-gray-300 px-4 py-2 peer-checked:border-l-blue-900`}
              >
                <span className="mr-2 text-sm font-bold">{index + 1}</span>
                <span className="text-sm">{playlistTitle.title}</span>
              </label>
            </>
          </div>
        ))}
        <div>
          <input
            id={`playlistTitles.custom`}
            className="peer"
            type="radio"
            value="custom"
            onChange={handleCustomOptionChange}
            {...register('customTitle')}
          />
          <label
            htmlFor={`playlistTitles.custom`}
            className={`flex cursor-pointer items-center border-b border-l-2 border-gray-300 px-4 py-2 peer-checked:border-l-blue-900`}
          >
            <span className="mr-2 text-sm font-bold">{fields.length + 1}</span>
            <span className="text-sm">Custom Title:</span>
            <input
              type="text"
              className="ml-2 rounded border border-gray-300 px-2 py-1"
              {...register(`playlistTitles.title`)}
              disabled={!watch('customTitle')}
            />
          </label>
        </div>
      </div>
    </>
  )
}

export default CustomiseTitle
