export const hasPlaylist = (): boolean => {
  const storedPlaylist: string[] = ['JAMS_tracks', 'JAMS_playlist_titles', 'JAMS_step']
  return storedPlaylist.every(item => {
    return Boolean(localStorage.getItem(item))
  })
}

export const isComplete = (): boolean => {
  return Boolean(localStorage.getItem('JAMS_playlist_id'))
}
