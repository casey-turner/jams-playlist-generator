import { Button } from '@components/Button'
import token from '@utils/token'

export const Error = () => {
  const handleClick = () => {
    localStorage.clear()
    token.remove()
  }

  return (
    <div className="flex flex-col items-center justify-center gap-x-3 md:flex-row">
      <h2 className="text-yale-blue basis-full text-2xl font-bold ">
        Something went wrong. Please try again
      </h2>
      <Button onClick={handleClick}>Start Over</Button>
    </div>
  )
}

Error.displayName = 'Error'
