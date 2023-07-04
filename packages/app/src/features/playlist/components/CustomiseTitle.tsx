import { useState } from 'react'
import usePlaylistFormContext from '../hooks/usePlaylistFormContext'

type CustomiseTitleProps = {
  playlistTitles: string[]
}

const CustomiseTitle = ({ playlistTitles }: CustomiseTitleProps) => {
  const { selectedPlaylistTitle, setSelectedPlaylistTitle } =
    usePlaylistFormContext()
  const [customTitle, setCustomTitle] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'playlistTitle') {
      setSelectedPlaylistTitle(value)
    } else if (name === 'customTitle') {
      setSelectedPlaylistTitle(value)
      setCustomTitle(value)
    }
  }

  const handleCustomTitleClick = () => {
    setSelectedPlaylistTitle(customTitle)
  }

  return (
    <>
      {playlistTitles && playlistTitles.length > 0 && (
        <div className="mt-4">
          <h2 className="text-3xl text-blue-950">Playlist Titles</h2>
          <div>
            {playlistTitles.map((title) => (
              <label key={title} className="mt-3 inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-600"
                  name="playlistTitle"
                  value={title}
                  onChange={handleChange}
                />
                <span className="ml-2 text-gray-700">{title}</span>
              </label>
            ))}
            <label className="mt-3 inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-5 w-5 text-blue-600"
                name="playlistTitle"
                value={customTitle}
                onChange={handleChange}
                checked={selectedPlaylistTitle === customTitle}
              />
              <input
                type="text"
                className="ml-2 rounded-md border border-gray-300 px-2 py-1"
                name="customTitle"
                value={customTitle}
                onChange={handleChange}
                onClick={handleCustomTitleClick}
                placeholder="Enter custom title"
              />
            </label>
          </div>
        </div>
      )}
    </>
  )
}

export default CustomiseTitle
