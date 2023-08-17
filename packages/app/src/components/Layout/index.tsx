import { Footer } from '@components/Footer'
import { Head } from '@components/Head'
import { Header } from '@components/Header'

const backgrounds = {
  light: 'bg-platinum',
  dark: 'bg-dark-moss-green',
}

type LayoutProps = {
  children: React.ReactNode
  title?: string
  url?: string
  description?: string
  background?: keyof typeof backgrounds
}

export const Layout = ({
  children,
  title,
  url,
  description,
  background = 'dark',
}: LayoutProps) => {
  return (
    <>
      <Head title={title} url={url} description={description} />
      <div className={backgrounds[background]}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.displayName = 'Layout'
