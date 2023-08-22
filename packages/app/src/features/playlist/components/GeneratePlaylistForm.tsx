// @ts-nocheck
import { Button } from '@components/Button'
import Autocomplete from '@components/Form/Autocomplete'
import Slider from '@components/Form/Slider'
import Switch from '@components/Form/Switch'
import { Loading } from '@components/Loading'
import authClient from '@utils/api'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import usePlaylistDataContext from '../hooks/usePlaylistDataContext'

const GeneratePlaylistForm = () => {
  const { handleSubmit, control } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { setAiTracks, setAiPlaylistTitles } = usePlaylistDataContext()

  const onSubmit = async (data) => {
    setIsLoading(true)
    const response = await authClient.post('/playlist', { data })
    console.log('response', response)
    if (response.data.success) {
      const { playlist, playlistTitles } = response.data

      // Add 'checked' key to each track object in the playlist
      const updatedPlaylist = playlist.map((track) => {
        return {
          ...track,
          checked: true,
        }
      })

      const updatedPlaylistTitles = playlistTitles.map((title) => {
        return {
          ...title,
          checked: true,
        }
      })
      setAiTracks(updatedPlaylist)
      setAiPlaylistTitles(updatedPlaylistTitles)

      navigate('/customise-playlist')
    } else {
      console.log('error')
    }
  }

  if (isLoading) {
    return (
      <Loading
        title="Brb, making music magic"
        copy="Your perfect personalised playlist is just seconds away..."
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-[750px]">
      <Controller
        name="genres"
        control={control}
        rules={{ required: true }}
        defaultValue={[]}
        render={({ field }) => <Autocomplete {...field} />}
      />
      <Controller
        name="numberOfSongs"
        control={control}
        defaultValue={20}
        render={({ field }) => <Slider {...field} min={15} max={40} />}
      />
      <Controller
        name="repeatArtist"
        control={control}
        defaultValue={false}
        render={({ field }) => <Switch {...field} />}
      />
      <div className="mt-5 flex justify-end">
        <Button type="submit">Generate Playlist</Button>
      </div>
    </form>
  )
}

export default GeneratePlaylistForm
