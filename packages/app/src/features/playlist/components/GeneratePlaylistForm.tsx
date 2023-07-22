// @ts-nocheck
// import authClient from '@utils/api'
import Autocomplete from '@components/Form/Autocomplete'
import Slider from '@components/Form/Slider'
import Switch from '@components/Form/Switch'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import usePlaylistDataContext from '../hooks/usePlaylistDataContext'

const GeneratePlaylistForm = () => {
  const { handleSubmit, control } = useForm()

  const navigate = useNavigate()
  const { setAiTracks, setAiPlaylistTitles } = usePlaylistDataContext()

  const onSubmit = (data) => {
    console.log('data', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="genres"
        control={control}
        rules={{ required: true }}
        defaultValue={[]}
        render={({ field }) => <Autocomplete {...field} />}
      />
      <Controller
        name="number-of-songs"
        control={control}
        defaultValue={20}
        render={({ field }) => <Slider {...field} min={15} max={40} />}
      />
      <Controller
        name="repeat-artist"
        control={control}
        defaultValue={false}
        render={({ field }) => <Switch {...field} />}
      />
      <input type="submit" />
    </form>
  )
}

export default GeneratePlaylistForm
