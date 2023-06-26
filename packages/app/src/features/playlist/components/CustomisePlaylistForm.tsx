import { useLocation } from 'react-router-dom'
import useCustomisePlaylistFormContext from '../hooks/useCustomisePlaylistFormContext'
import CustomiseCoverImage from './CustomiseCoverImage'
import CustomiseTitle from './CustomiseTitle'
import CustomiseTracks from './CustomiseTracks'

const CustomisePlaylistForm = () => {
  const { step, setStep, data, title, isFormValid } =
    useCustomisePlaylistFormContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(JSON.stringify(data))
  }

  const location = useLocation()
  const { playlist, playlistTitles } = location.state

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        {/* <header>{title[step]}</header> */}
        <CustomiseTracks tracks={playlist} />
        <CustomiseTitle playlistTitles={playlistTitles} />
        <CustomiseCoverImage />
        <div>
          <button type="button" onClick={() => setStep(step - 1)}>
            Back
          </button>
          <button type="button" onClick={() => setStep(step + 1)}>
            Next
          </button>
          <button type="submit" disabled={!isFormValid}>
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default CustomisePlaylistForm
