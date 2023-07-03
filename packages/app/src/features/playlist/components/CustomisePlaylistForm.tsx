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

  const displayStep = {
    0: <CustomiseTracks tracks={data.tracks} />,
    1: <CustomiseTitle playlistTitles={data.title} />,
    2: <CustomiseCoverImage />,
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        {displayStep[step]}
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

// import { useLocation } from 'react-router-dom'
// import usePlaylistDataContext from '../hooks/usePlaylistDataContext'

// const CustomisePlaylistForm = () => {
//   const { tracks, playlistTitles } = usePlaylistDataContext()
//   console.log(tracks)
//   console.log(playlistTitles)
//   const location = useLocation()

//   return <></>
// }

// export default CustomisePlaylistForm
