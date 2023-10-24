// @ts-nocheck
import { Button } from '@components/Button'
import authClient from '@utils/api'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import usePlaylistFormContext from '../hooks/usePlaylistFormContext'
import CustomiseTitle from './CustomiseTitle'
import CustomiseTracks from './CustomiseTracks'

const CustomisePlaylistForm = () => {
  const { aiTracks, step, aiPlaylistTitles, setStep } = usePlaylistFormContext()
  const navigate = useNavigate()

  const methods = useForm({
    defaultValues: {
      tracks: aiTracks,
      playlistTitle: aiPlaylistTitles,
    },
  })

  const { watch, setValue } = methods

  const onSubmit = async (data) => {
    const { playlistTitle, tracks } = data
    const selectedTrackURIs = tracks
      .filter((track) => track.checked)
      .map((track) => track.uri)

    try {
      const { status, data } = await authClient.post('/create-playlist', {
        playlistTitle,
        tracks: selectedTrackURIs,
      })

      if (status === 200 && data.playlistId) {
        localStorage.setItem('Jams_playlist_id', data.playlistId)
        navigate('/complete')
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    const titles = localStorage.getItem('Jams_playlist_titles')
    if (titles) {
      setValue('playlistTitle', JSON.parse(titles))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'Jams_playlist_titles',
      JSON.stringify(watch('playlistTitle'))
    )
  }, [watch])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mx-auto max-w-[750px]"
      >
        {step === 1 && (
          <>
            <CustomiseTracks />
            <div className="mt-8 flex flex-row justify-center gap-4">
              <Button
                type="button"
                onClick={handleNext}
                disabled={!methods.formState.isValid}
              >
                Next
              </Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <CustomiseTitle />
            <div className="mt-8 flex flex-row justify-center gap-4">
              <Button type="button" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </>
        )}
      </form>
    </FormProvider>
  )
}

export default CustomisePlaylistForm
