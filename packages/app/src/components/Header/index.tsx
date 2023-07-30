import { ArrowUndo } from '@/assets/icons/backward-sharp-light'
import reactLogo from '@assets/react.svg'
import { Button } from '@components/Button'
import { Container } from '@components/Container'
import token from '@utils/token'
import { useState } from 'react'
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
          <li key={item.name} className="mb-4 text-3xl font-bold uppercase">
            <NavLink to={item.to}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
      <p className="mt-auto text-sm">
        JAMS was made with 💖 while listening to this{' '}
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
        className={`hamburger-inner bg-alice-blue before:bg-alice-blue after:bg-alice-blue absolute bottom-0 h-px w-5 before:absolute before:-top-1.5 before:h-px before:w-5 after:absolute after:-top-3 after:h-px after:w-5 ${
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
    token.remove()
    localStorage.clear()
    window.location.href = '/'
  }
  return (
    <Button theme="text" startIcon={<ArrowUndo />} onClick={handleLogout}>
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
    <Button theme="text" startIcon={<ArrowUndo />} onClick={handleRestart}>
      Start Over
    </Button>
  )
}

export const Header = () => {
  const location = useLocation()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [randomSpotifyLink, setRandomSpotifyLink] = useState('')

  const spotifyLinks = [
    '<a href="https://open.spotify.com/playlist/75USLqe4N3RsMtFvPZfOhM?si=895d78082ce64abb"> classic Aussie dad rock playlist</a>',
    '<a href="https://open.spotify.com/playlist/7p36TIjl8d7v9LXUuuTBg8?si=9f335ffd65fc4488&pt=d8e1e8318c3fcb53fb185c1ffa7e9cff"> magnificent Misfits playlist </a>',
  ]

  const handleMenu = () => {
    setIsNavOpen(!isNavOpen)
    if (isNavOpen) {
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
            {token.get() && location.pathname != '/generate-playlist' ? (
              <RestartButton />
            ) : null}
            {token.get() ? <LogoutButton /> : null}

            <NavButton isNavOpen={isNavOpen} handleMenu={handleMenu} />
          </div>
        </div>
      </Container>
      <Nav isNavOpen={isNavOpen} getSpotifyLink={randomSpotifyLink} />
    </header>
  )
}

Header.displayName = 'Header'
