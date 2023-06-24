import { Button } from '@components/Button'
import { Head } from '@components/Head'
import isAuth from '@utils/auth'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  const handleStart = () => {
    if (!isAuth()) {
      navigate('/connect')
    } else {
      navigate('/generate')
    }
  }

  return (
    <>
      <Head title="Landing" description="Landing" />
      <div>Landing page</div>
      <Button onClick={handleStart}>Get Started</Button>
    </>
  )
}

export default Landing
