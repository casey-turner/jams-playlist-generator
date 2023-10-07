import { Footer } from '@components/Footer'
import { Head } from '@components/Head'
import { Header } from '@components/Header'

type LayoutProps = {
  children: React.ReactNode
  title?: string
  url?: string
  description?: string
}

export const Layout = ({
  children,
  title,
  url,
  description,
}: LayoutProps) => {
  return (
    <>
      <Head title={title} url={url} description={description} />
      <div className="bg-anti-flash-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.displayName = 'Layout'
