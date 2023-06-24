import Cookies from 'js-cookie'

const token = {
  get: () => Cookies.get('spotify'),
  remove: () => Cookies.remove('spotify'),
}

export default token
