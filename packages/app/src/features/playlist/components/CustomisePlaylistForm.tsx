// @ts-nocheck
import { Button } from '@components/Button'
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

  // async arrow function
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

  console.log('methods', methods.formState)
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center"
      >
        {step === 1 && (
          <>
            <CustomiseTracks />
            <Button
              type="button"
              onClick={handleNext}
              disabled={!methods.formState.isValid}
            >
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <CustomiseTitle />
            <Button type="button" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit">Submit</Button>
          </>
        )}
      </form>
    </FormProvider>
  )
}

export default CustomisePlaylistForm
