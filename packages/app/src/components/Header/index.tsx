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
}

const Nav = ({ isNavOpen }: NavProps) => {
  return (
    <nav
      className={`${
        isNavOpen ? 'translate-x-0' : 'translate-x-full'
      } fixed right-0 top-0 z-40 h-screen w-full transform bg-blue-900 px-8 py-20 transition duration-1000 ease-in-out md:w-64`}
    >
      <ul>
        {navigationItems.map((item) => (
          <li key={item.name}>
            <NavLink to={item.to}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
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
        className={`hamburger-inner absolute bottom-0 h-px w-5 bg-black before:absolute before:-top-1.5 before:h-px before:w-5 before:bg-black after:absolute after:-top-3 after:h-px after:w-5 after:bg-black ${
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
  console.log('location', location)
  const handleMenu = () => {
    setIsNavOpen(!isNavOpen)
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
      <Nav isNavOpen={isNavOpen} />
    </header>
  )
}

Header.displayName = 'Header'
