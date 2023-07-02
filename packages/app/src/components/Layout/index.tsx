import { Container } from '@components/Container'
import { Footer } from '@components/Footer'
import { Head } from '@components/Head'
import { Header } from '@components/Header'

type LayoutProps = {
  children: React.ReactNode
  title?: string
  url?: string
  description?: string
}

export const Layout = ({ children, title, url, description }: LayoutProps) => {
  return (
    <>
      <Head title={title} url={url} description={description} />
      <Header />
      <main>
        <Container width="contained">{children}</Container>
      </main>
      <Footer />
    </>
  )
}

Layout.displayName = 'Layout'
