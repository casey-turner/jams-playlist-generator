import token from '@utils/token'

const isAuth = () => !!token.get()

export default isAuth
