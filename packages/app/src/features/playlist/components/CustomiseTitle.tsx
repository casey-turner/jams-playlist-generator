type CustomiseTitleProps = {
  playlistTitles: string[]
}

const CustomiseTitle = ({ playlistTitles }: CustomiseTitleProps) => {
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
                  name={`playlist-${title}`}
                  value={title}
                  // onChange={handlePlaylistTitleChange}
                  // checked={selectedPlaylistTitle === title}
                />
                <span className="ml-2 text-gray-700">{title}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CustomiseTitle
