import Cookies from 'js-cookie'

const token = {
  get: () => Cookies.get('jams_token'),
  remove: () =>
    Cookies.remove('jams_token', {
      path: '/',
      domain: `${import.meta.env.DOMAIN}`,
      secure: true,
      sameSite: 'none',
    }),
}

export default token
