import Cookies from 'js-cookie'

const LogoutButton = () => {
  const handleLogout = () => {
    Cookies.remove('spotify')
    window.location.href = '/'
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default LogoutButton
