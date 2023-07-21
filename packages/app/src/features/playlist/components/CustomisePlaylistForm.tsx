// @ts-nocheck
import { Button } from '@components/Button'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import usePlaylistFormContext from '../hooks/usePlaylistFormContext'
import CustomiseTitle from './CustomiseTitle'
import CustomiseTracks from './CustomiseTracks'

const CustomisePlaylistForm = () => {
  const { aiTracks, step, aiPlaylistTitles, setStep } = usePlaylistFormContext()

  const methods = useForm({
    defaultValues: {
      tracks: aiTracks,
      playlistTitles: aiPlaylistTitles,
    },
  })

  const { watch, setValue } = methods

  const onSubmit = async (data) => {
    console.log('data', data)
    // const { playlistTitle, tracks } = data
    // const response = await authClient.post('/create-playlist', {
    //   playlistTitle,
    //   tracks,
    // })
    // console.log('response', response)
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  useEffect(() => {
    const titles = localStorage.getItem('JAMS_playlist_titles')
    if (titles) {
      setValue('playlistTitles', JSON.parse(titles))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'JAMS_playlist_titles',
      JSON.stringify(watch('playlistTitles'))
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
