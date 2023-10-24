export const hasPlaylist = (): boolean => {
  const storedPlaylist: string[] = [
    'Jams_tracks',
    'Jams_playlist_titles',
    'Jams_step',
  ]
  return storedPlaylist.every((item) => {
    return Boolean(localStorage.getItem(item))
  })
}

export const isComplete = (): boolean => {
  return Boolean(localStorage.getItem('Jams_playlist_id'))
}
