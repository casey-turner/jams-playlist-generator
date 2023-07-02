import { Container } from '@components/Container'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>
        <Container width="contained">{children}</Container>
      </main>
      <Footer />
    </>
  )
}

Layout.displayName = 'Layout'
