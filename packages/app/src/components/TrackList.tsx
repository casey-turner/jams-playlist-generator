function TrackList({ tracks }) {
  console.log(tracks)
  return (
    <ul>
      {tracks &&
        tracks.map((track) => (
          <li key={track.title}>
            <img
              src={track.albumCover}
              alt={track.album}
              className="w-24 h-24"
            />
            {track.title} - {track.artist} - {track.album}
          </li>
        ))}
    </ul>
  )
}

export default TrackList
