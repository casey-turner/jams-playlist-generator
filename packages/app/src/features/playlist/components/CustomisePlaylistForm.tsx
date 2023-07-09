// @ts-nocheck
import { Button } from '@components/Button'
import authClient from '@utils/api'
import { FormProvider, useForm } from 'react-hook-form'
import usePlaylistFormContext from '../hooks/usePlaylistFormContext'
import CustomiseTitle from './CustomiseTitle'
import CustomiseTracks from './CustomiseTracks'

const CustomisePlaylistForm = () => {
  const methods = useForm()
  const { aiTracks, step, aiPlaylistTitles, setStep } = usePlaylistFormContext()

  // async arrow function
  const onSubmit = async (data) => {
    console.log('data', data)
    const { playlistTitle, tracks } = data
    const response = await authClient.post('/create-playlist', {
      playlistTitle,
      tracks,
    })
    console.log('response', response)
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  console.log('methods', methods)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center"
      >
        {step === 1 && (
          <>
            <CustomiseTracks tracks={aiTracks} />
            <Button
              type="button"
              onClick={handleNext}
              disabled={methods.formState.isValid !== true}
            >
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <CustomiseTitle playlistTitles={aiPlaylistTitles} />
            <button type="button" onClick={handleBack}>
              Back
            </button>
            <button type="submit">Submit</button>
          </>
        )}
      </form>
    </FormProvider>
  )
}

export default CustomisePlaylistForm
