import Cookies from 'js-cookie'

const token = {
  get: () => Cookies.get('jams_token'),
  remove: () => Cookies.remove('jams_token'),
}

export default token
