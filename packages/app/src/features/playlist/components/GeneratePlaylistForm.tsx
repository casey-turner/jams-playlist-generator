// @ts-nocheck
import token from '@/utils/token'
import { Button } from '@components/Button'
import Autocomplete from '@components/Form/Autocomplete'
import Slider from '@components/Form/Slider'
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
    console.log('token: ', token.get())
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
    <>
      <h1 className="font-poppins text-yale-blue mb-10 text-center text-4xl font-extrabold">
        Generate Playlist
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-[700px] flex-col gap-12"
      >
        <div>
          <Controller
            name="genres"
            control={control}
            rules={{ required: true }}
            defaultValue={[]}
            render={({ field }) => <Autocomplete {...field} />}
          />
        </div>
        <div>
          <Controller
            name="numberOfSongs"
            control={control}
            defaultValue={20}
            render={({ field }) => <Slider {...field} min={15} max={40} />}
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit">Generate Playlist</Button>
        </div>
      </form>
    </>
  )
}

export default GeneratePlaylistForm
