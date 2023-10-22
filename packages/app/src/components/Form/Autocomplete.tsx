import { CancelIcon, ChevronDownIcon, ChevronUpIcon } from '@assets/icons'
import { genreOptions } from '@data/genres'
import { useAutocomplete } from '@mui/base'
import * as React from 'react'

type TagProps = {
  label: string
  onDelete: () => void
}

const Tag = (props: TagProps) => {
  const { label, onDelete, ...other } = props
  return (
    <div
      {...other}
      className="bg-yale-blue text-anti-flash-white flex items-center gap-1 rounded-full px-2 py-0.5 text-xs sm:text-sm"
    >
      <span>{label}</span>
      <span
        onClick={onDelete}
        className="text-anti-flash-white bg-yale-blue block h-3.5 w-3.5 cursor-pointer rounded-full"
      >
        <CancelIcon />
      </span>
    </div>
  )
}

const Autocomplete = React.forwardRef(function Autocomplete(props) {
  const {
    getClearProps,
    getRootProps,
    getInputLabelProps,
    getPopupIndicatorProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    value,
    setAnchorEl,
    dirty,
    expanded,
  } = useAutocomplete({
    ...props,
    id: 'autocomplete',
    defaultValue: [],
    multiple: true,
    options: genreOptions,
    isOptionEqualToValue: (option, value) => option === value,
    onChange: (e, v) => {
      props.onChange(v)
    },
  })

  const hasClearIcon = dirty && value.length > 0

  // if screen width is greater than 768px show a placeholder
  const placeholder = window.innerWidth > 768 ? 'Search for a genre' : ''

  return (
    <>
      <div className="relative">
        <div {...getRootProps()}>
          <label
            className="text-gunmetal mb-4 block text-sm font-bold md:text-base"
            {...getInputLabelProps()}
          >
            Select Playlist Genres
          </label>
          <div
            ref={setAnchorEl}
            className={`border ${
              focused ? 'border-pear' : 'border-yale-blue '
            } flex flex-wrap gap-2 rounded-full border-2 px-4 py-2`}
          >
            {value.map((option, index) => (
              <Tag label={option} {...getTagProps({ index })} />
            ))}
            <input
              {...getInputProps()}
              className="grow-1 w-0 flex-grow bg-transparent text-xs outline-none md:text-sm"
            />
            <span className="ml-auto flex gap-1 md:gap-x-3">
              {hasClearIcon && (
                <button
                  {...getClearProps()}
                  type="button"
                  className="text-yale-blue block h-5 w-5 rounded-full sm:h-6 sm:w-6"
                >
                  <CancelIcon />
                </button>
              )}
              <button
                {...getPopupIndicatorProps()}
                type="button"
                className="text-yale-blue block h-5 w-5 rounded-full sm:h-6 sm:w-6"
              >
                {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
            </span>
          </div>
        </div>
        {groupedOptions.length > 0 ? (
          <ul
            className="absolute left-3 z-10 mt-2 max-h-80 w-[calc(100vw-75px)]  overflow-y-auto rounded-md border border-gray-300 bg-white py-2 text-sm shadow-lg md:w-[670px]"
            {...getListboxProps()}
          >
            {groupedOptions.map((option, index) => (
              <li
                className={`hover:bg-silver cursor-pointer px-4 py-2 ${
                  value.indexOf(option as string) > -1
                    ? 'bg-silver text-yale-blue'
                    : ''
                }`}
                {...getOptionProps({ option: option as string, index })}
              >
                <span>{option as string}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  )
})

export default Autocomplete
