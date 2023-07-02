import { Footer } from '@components/Footer'
import { Header } from '@components/Header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.displayName = 'Layout'
