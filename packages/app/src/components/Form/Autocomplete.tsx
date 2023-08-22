// @ts-nocheck
import { CancelIcon, ChevronDownIcon, ChevronUpIcon } from '@assets/icons'
import { genreOptions } from '@data/genres'
import { useAutocomplete } from '@mui/base'
import * as React from 'react'

const Tag = (props) => {
  const { label, onDelete, ...other } = props
  return (
    <div
      {...other}
      className="flex items-center gap-1 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white sm:text-sm"
    >
      <span>{label}</span>
      <span
        onClick={onDelete}
        className="text-alice-blue h-3 w-3 cursor-pointer sm:h-4 sm:w-4"
      >
        <CancelIcon />
      </span>
    </div>
  )
}

const Autocomplete = React.forwardRef(function Autocomplete(props, ref) {
  const {
    disableClearable = false,
    disabled = false,
    readOnly = false,
    options,
    ...other
  } = props

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
    getToggleButtonProps,
    popupOpen,
    open,
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

  const hasClearIcon = !disableClearable && !disabled && dirty && !readOnly

  return (
    <>
      <div className="relative">
        <div {...getRootProps()}>
          <label className="mb-2 block font-bold" {...getInputLabelProps()}>
            Select Playlist Genres
          </label>
          <div
            ref={setAnchorEl}
            className={`border ${
              focused ? 'border-blue-400' : 'border-alice-blue '
            } flex flex-wrap gap-2 rounded-full border-2 px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400`}
          >
            {value.map((option, index) => (
              <Tag key={index} label={option} {...getTagProps({ index })} />
            ))}
            <input
              {...getInputProps()}
              placeholder="What do you want to listen to?"
              className="grow-1 w-0 min-w-[240px] bg-transparent outline-none"
            />
            <span className="ml-auto flex h-5 gap-x-3">
              {hasClearIcon && (
                <button
                  {...getClearProps()}
                  type="button"
                  className="text-alice-blue block h-5 w-5 rounded-full bg-blue-500 hover:bg-blue-600 sm:h-6 sm:w-6"
                >
                  <CancelIcon />
                </button>
              )}
              <button
                {...getPopupIndicatorProps()}
                type="button"
                className="text-alice-blue block h-5 w-5 rounded-full bg-blue-500 hover:bg-blue-600 sm:h-6 sm:w-6"
              >
                {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
            </span>
          </div>
        </div>
        {groupedOptions.length > 0 ? (
          <ul
            className="absolute left-5 z-10 mt-2 max-h-80  w-[700px] overflow-y-auto rounded-md border border-gray-300 bg-white py-2 shadow-lg"
            {...getListboxProps()}
          >
            {groupedOptions.map((option, index) => (
              <li
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                  (index === focused ? 'bg-gray-100' : '',
                  value.indexOf(option) > -1 ? 'bg-gray-100' : '')
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
