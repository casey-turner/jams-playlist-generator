import { BackwardIcon, EjectIcon } from '@assets/icons'
import reactLogo from '@assets/react.svg'
import { Button } from '@components/Button'
import { Container } from '@components/Container'
import token from '@utils/token'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

type NavigationItem = {
  name: string
  to: string
}

const navigationItems: NavigationItem[] = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'About',
    to: '/about',
  },
  {
    name: 'Contact',
    to: '/contact',
  },
]

type NavProps = {
  isNavOpen: boolean
  handleMenu?: () => void
  getSpotifyLink?: string
}

const Nav = ({ isNavOpen, getSpotifyLink }: NavProps) => {
  return (
    <nav
      className={`${
        isNavOpen ? 'translate-x-0' : 'translate-x-full'
      } bg-oxford-blue text-peach fixed right-0 top-0 z-40 flex h-screen w-full transform flex-col px-8 pb-4 pt-20 transition duration-700 ease-in-out md:w-1/2`}
    >
      <ul>
        {navigationItems.map((item) => (
          <li key={item.name} className="font-poppins mb-4 text-3xl font-bold">
            <NavLink to={item.to}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
      <p className="font-poppins mt-auto text-sm font-light">
        Jams was made with 💖 while listening to this{' '}
        {getSpotifyLink && (
          <span
            className="underline"
            dangerouslySetInnerHTML={{ __html: getSpotifyLink }}
          />
        )}
      </p>
    </nav>
  )
}

const NavButton = ({ isNavOpen, handleMenu }: NavProps) => {
  return (
    <div
      className={`hamburger relative z-50 flex h-[13px] w-5 cursor-pointer ${
        isNavOpen ? 'is-active' : ''
      }`}
      onClick={handleMenu}
    >
      <div
        className={`bg-paynes-gray before:bg-paynes-gray after:bg-paynes-gray hamburger-inner  absolute bottom-0 h-0.5 w-6 before:absolute before:-top-1.5 before:h-0.5 before:w-6 after:absolute after:-top-3 after:h-0.5 after:w-6 ${
          isNavOpen ? 'after:top-0 after:opacity-0' : ''
        }`}
      ></div>
    </div>
  )
}

const Logo = () => {
  return (
    <Link to="/" className="h-10 w-10 bg-black">
      <img src={reactLogo} className="logo react" alt="React logo" />
    </Link>
  )
}

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.clear()
    token.remove()
    window.location.href = '/'
  }

  return (
    <Button
      style="text"
      colour="secondary"
      startIcon={<EjectIcon />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}

const RestartButton = () => {
  const navigate = useNavigate()
  const handleRestart = () => {
    localStorage.clear()
    navigate('/generate-playlist')
  }
  return (
    <Button
      style="text"
      colour="secondary"
      startIcon={<BackwardIcon />}
      onClick={handleRestart}
    >
      Start Over
    </Button>
  )
}

export const Header = () => {
  const location = useLocation()

  const [isNavOpen, setIsNavOpen] = useState(false)
  const [randomSpotifyLink, setRandomSpotifyLink] = useState('')
  const [isRestart, setIsRestart] = useState(false)

  useEffect(() => {
    const jamsTracks = localStorage.getItem('JAMS_tracks')
    const jamsPlaylistTitles = localStorage.getItem('JAMS_playlist_titles')

    if (jamsTracks !== null || jamsPlaylistTitles !== null) {
      setIsRestart(true)
    }
  }, [])

  const spotifyLinks = [
    '<a href="https://open.spotify.com/playlist/75USLqe4N3RsMtFvPZfOhM?si=895d78082ce64abb"> ultimate Aussie dad rock playlist</a>',
    '<a href="https://open.spotify.com/playlist/7p36TIjl8d7v9LXUuuTBg8?si=9f335ffd65fc4488&pt=d8e1e8318c3fcb53fb185c1ffa7e9cff"> magnificent Misfits playlist </a>',
  ]

  const handleMenu = () => {
    setIsNavOpen((prevIsNavOpen) => !prevIsNavOpen)
    if (!isNavOpen) {
      const randomLink =
        spotifyLinks[Math.floor(Math.random() * spotifyLinks.length)]
      setRandomSpotifyLink(randomLink)
    }
  }

  return (
    <header>
      <Container width="full">
        <div className="flex items-center justify-between py-2">
          <Logo />
          <div className="flex items-center gap-6">
            {isRestart ? <RestartButton /> : null}
            {token.get() ? <LogoutButton /> : null}
            <NavButton
              isNavOpen={isNavOpen}
              handleMenu={handleMenu}
            />
          </div>
        </div>
      </Container>
      <Nav isNavOpen={isNavOpen} getSpotifyLink={randomSpotifyLink} />
    </header>
  )
}

Header.displayName = 'Header'
