import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

type HeadProps = {
  title?: string
  description?: string
  url?: string
}

export const Head = ({
  title = '',
  description = '',
  url = '',
}: HeadProps = {}) => {
  const location = useLocation()
  const currentUrl = window.location.origin + location.pathname
  console.log(location)

  return (
    <Helmet
      title={title ? `${title} | JAMS - AI Playlist Generator` : undefined}
      defaultTitle="JAMS - AI Playlist Generator"
    >
      {description && <meta name="description" content={description} />}
      {url && <link rel="canonical" href={url} />}
      {!url && <link rel="canonical" href={currentUrl} />}
    </Helmet>
  )
}

Head.displayName = 'Head'
