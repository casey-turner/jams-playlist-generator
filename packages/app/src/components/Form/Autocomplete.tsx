// @ts-nocheck
import { genreOptions } from '@data/genres'
import { useAutocomplete } from '@mui/base'
import * as React from 'react'

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

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
  const {
    handleDelete,
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    value,
    setAnchorEl,
  } = useAutocomplete({
    id: 'autocomplete',
    defaultValue: [],
    multiple: true,
    options: genreOptions,
    // getOptionLabel: (option) => option.label,
    // isOptionEqualToValue: (option, value) => option.label === value.label,
    isOptionEqualToValue: (option, value) => option === value,
    onChange: (e, v) => {
      props.onChange(v)
    },
  })

  return (
    <>
      <div className="relative">
        <div className="" {...getRootProps()}>
          <label {...getInputLabelProps()}>Select Playlist Genres</label>
          <div
            ref={setAnchorEl}
            className={`border ${
              focused ? 'border-blue-400' : 'border-alice-blue '
            } flex flex-wrap gap-2 rounded-full border-2 px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400`}
          >
            {value.map((option, index) => (
              <Tag
                key={index}
                label={option}
                onDelete={() => handleDelete(index)}
                {...getTagProps({ index })}
              />
            ))}
            <input
              {...getInputProps()}
              placeholder="What do you want to listen to?"
              className="grow-1 w-0 min-w-[240px] bg-transparent outline-none"
            />
          </div>
        </div>
        {groupedOptions.length > 0 ? (
          <ul
            className="absolute left-5 mt-2 max-h-80  w-[700px] overflow-y-auto rounded-md border border-gray-300 bg-white py-2 shadow-lg"
            {...getListboxProps()}
          >
            {groupedOptions.map((option, index) => (
              <li
                className={`cursor-pointer px-4 py-2 ${
                  option === focused ? 'bg-blue-100' : ''
                }`}
                {...getOptionProps({ option, index })}
              >
                <span>{option}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  )
})

export default Autocomplete
