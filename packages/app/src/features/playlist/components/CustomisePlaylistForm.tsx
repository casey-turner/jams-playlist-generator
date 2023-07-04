// @ts-nocheck
// import useCustomisePlaylistFormContext from '../hooks/usePlaylistFormContext'
// import CustomiseCoverImage from './CustomiseCoverImage'
// import CustomiseTitle from './CustomiseTitle'
// import CustomiseTracks from './CustomiseTracks'

// const CustomisePlaylistForm = () => {
//   const {
//     step,
//     setStep,
//     data,
//     title,
//     isFormValid,
//     disableNext,
//     disablePrevious,
//     removeNext,
//     removePrevious,
//     removeSubmit,
//   } = useCustomisePlaylistFormContext()

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log(JSON.stringify(data))
//   }

//   const displayStep = {
//     0: <CustomiseTracks tracks={data.tracks} />,
//     1: <CustomiseTitle playlistTitles={data.title} />,
//     2: <CustomiseCoverImage />,
//   }

//   return (
//     <>
//       <form action="" onSubmit={handleSubmit}>
//         {displayStep[step]}
//         <div>
//           {removePrevious && (
//             <button type="button" onClick={() => setStep(step - 1)}>
//               Back
//             </button>
//           )}
//           {removeNext && (
//             <button type="button" onClick={() => setStep(step + 1)}>
//               Next
//             </button>
//           )}
//           {removeSubmit && (
//             <button type="submit" disabled={!isFormValid}>
//               Submit
//             </button>
//           )}
//         </div>
//       </form>
//     </>
//   )
// }

// export default CustomisePlaylistForm

import authClient from '@utils/api'
import usePlaylistFormContext from '../hooks/usePlaylistFormContext'
import CustomiseCoverImage from './CustomiseCoverImage'
import CustomiseTitle from './CustomiseTitle'
import CustomiseTracks from './CustomiseTracks'

const CustomisePlaylistForm = () => {
  const {
    tracks,
    selectedTracks,
    setSelectedTracks,
    playlistTitles,
    selectedPlaylistTitle,
    setSelectedPlaylistTitle,
    step,
    setStep,
  } = usePlaylistFormContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = { selectedTracks, selectedPlaylistTitle }
      const response = await authClient.post('/create-playlist', data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const displayStep = {
    0: <CustomiseTracks tracks={tracks} />,
    1: <CustomiseTitle playlistTitles={playlistTitles} />,
    2: <CustomiseCoverImage />,
  }

  return (
    <>
      <form action="">
        {displayStep[step]}
        <div>
          <button type="button" onClick={() => setStep(step - 1)}>
            Back
          </button>

          <button type="button" onClick={() => setStep(step + 1)}>
            Next
          </button>

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default CustomisePlaylistForm
