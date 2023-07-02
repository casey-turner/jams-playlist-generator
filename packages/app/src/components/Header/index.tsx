import reactLogo from '@assets/react.svg'
import { Container } from '@components/Container'
import token from '@utils/token'
import { useState } from 'react'
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
    <button
      onClick={handleMenu}
      className="ease-cubic-bezier relative z-50 flex h-[100px] w-[100px] items-center justify-end overflow-visible bg-black"
    >
      <div
        className={`ease-cubic-bezie absolute block h-[3px] w-full bg-white transition-transform duration-300  
            ${
              isNavOpen
                ? 'translate-z-0 translate-x-0 translate-y-0 rotate-45 transform'
                : 'translate-y-[-40px] transform'
            }`}
      ></div>
      <div
        className={`h-[3px] w-3/4 transform rounded bg-white transition-all duration-300
            ${isNavOpen ? 'opacity-0' : 'opacity-100'}`}
      ></div>
      <div
        className={`ease-cubic-bezie absolute block h-[3px] w-full bg-white transition-transform duration-300 ${
          isNavOpen
            ? 'translate-z-0 translate-x-0 translate-y-0 -rotate-45 transform'
            : 'translate-y-[40px] transform'
        }`}
      ></div>
    </button>
  )
}

const Logo = () => {
  return (
    <Link to="/" className="h-10 w-10 bg-black">
      <img src={reactLogo} className="logo react" alt="React logo" />
    </Link>
  )
}

// add logout button
const LogoutButton = () => {
  const handleLogout = () => {
    token.remove()
    window.location.href = '/'
  }

  return (
    <button
      className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const handleMenu = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <header>
      <Container width="full">
        <div className="flex items-center justify-between py-2">
          <Logo />
          {token.get() ? <LogoutButton /> : null}
          <NavButton isNavOpen={isNavOpen} handleMenu={handleMenu} />
        </div>
      </Container>
      <Nav isNavOpen={isNavOpen} />
    </header>
  )
}

Header.displayName = 'Header'
