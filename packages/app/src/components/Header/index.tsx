import { BackwardIcon, EjectIcon } from '@assets/icons'
import { Container } from '@components/Container'
import { TextLink } from '@components/TextLink'
import token from '@utils/token'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

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
          <li key={item.name} className="text-pear mb-4 text-3xl font-semibold">
            <NavLink to={item.to}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
      <p className="text-anti-flash-white mt-auto text-sm font-light">
        Jams was made with 💖 while listening to{' '}
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
    <Link to="/" className="">
      Jams
    </Link>
  )
}

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.clear()
    token.remove()
  }

  return (
    <TextLink to="/" onClick={handleLogout} startIcon={<EjectIcon />}>
      Logout
    </TextLink>
  )
}

const RestartButton = () => {
  const handleRestart = () => {
    localStorage.clear()
  }
  return (
    <TextLink
      to="/generate-playlist"
      onClick={handleRestart}
      startIcon={<BackwardIcon />}
    >
      Start Over
    </TextLink>
  )
}

export const Header = () => {
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
    '<a href="https://open.spotify.com/playlist/75USLqe4N3RsMtFvPZfOhM?si=895d78082ce64abb" target="_blank">this ultimate Aussie "dad-rock" playlist 🦘</a>',
    '<a href="https://open.spotify.com/playlist/4fGQSI2AZumVGqe0ACqtWd?si=5601f74539cb4e1b" target="_blank">this playlist of all my favourite heart-melty, pop-punk love songs 💘</a>',
    '<a href="https://open.spotify.com/playlist/7p36TIjl8d7v9LXUuuTBg8?si=2e7adbf177014fe0" target="_blank">this tribute to the Godfather of horror-punk, Glen Danzig 💀</a>',
    '<a href="https://open.spotify.com/playlist/7KFiQ2NmLPZqghjHBaeBQx?si=ab930f02973f4178" target="_blank">this playlist of rockabilly classics 🐅</a>',
    '<a href="https://open.spotify.com/playlist/5WqZzNMhgJ9GSLL0XOKKqf?si=c4dcaafff3124e14" target="_blank">this playlist of nothin but 90s rom-com vibes 💟</a>',
    '<a href="https://open.spotify.com/playlist/2CVrmypPxGJSZpa908OK07?si=8d6eea1ef4284db9" target="_blank">this playlist of my favourite punx gone solo ✨</a>',
    '<a href="https://open.spotify.com/playlist/1OmQZZVL62rZedDeTr0P0h?si=c92d8f0c5594497e" target="_blank">this playlist of youth crew & HC classics 👊🏼</a>',
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
          <div className="flex items-center gap-4 md:gap-6">
            {isRestart ? <RestartButton /> : null}
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
