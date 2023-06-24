import token from '@/utils/token'

const isAuth = () => {
  if (token.get()) {
    return true
  }
  return false
}

export default isAuth
