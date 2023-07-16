// @ts-nocheck
import { useAutocomplete } from '@mui/base'

const Tag = (props) => {
  const { label, onDelete, ...other } = props
  return (
    <div
      {...other}
      className="flex items-center gap-1 rounded-md bg-blue-500 px-2 py-1 text-white"
    >
      <span>{label}</span>
      <div onClick={onDelete} className="h-4 w-4 cursor-pointer bg-black" />
    </div>
  )
}

export const Autocomplete = () => {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    multiple: true,
    options: [
      { label: 'Metal' },
      { label: 'Post-Punk' },
      { label: 'Pop-Punk' },
      { label: 'Pop' },
      { label: 'Rock' },
      { label: 'Indie' },
      { label: 'Hip-Hop' },
    ],
    getOptionLabel: (option) => option.label,
    isOptionEqualToValue: (option, value) => option.label === value.label,
  })

  return (
    <>
      <div className="relative">
        <div {...getRootProps()}>
          <label {...getInputLabelProps()}>Select Playlist Genres</label>
          <div
            ref={setAnchorEl}
            className={`border ${
              focused ? 'border-blue-400' : 'border-gray-300'
            } flex flex-wrap gap-2 rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-400`}
          >
            {value.map((option, index) => (
              <Tag
                key={index}
                label={option.label}
                onDelete={() => handleDelete(index)}
                {...getTagProps({ index })}
              />
            ))}
            <input {...getInputProps()} />
          </div>
        </div>
        {groupedOptions.length > 0 ? (
          <ul
            className="absolute mt-2 w-[500px] max-w-[500px] rounded-md border border-gray-300 bg-white py-2 shadow-lg"
            {...getListboxProps()}
          >
            {groupedOptions.map((option, index) => (
              <li
                className={`cursor-pointer px-4 py-2 ${
                  option === focused ? 'bg-blue-100' : ''
                }`}
                {...getOptionProps({ option, index })}
              >
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  )
}
