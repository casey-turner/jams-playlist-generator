import { Helmet } from 'react-helmet-async'

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
  return (
    <Helmet>
      <title>
        {title ? `${title} | JAMS - AI Playlist Generator` : undefined}
      </title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
