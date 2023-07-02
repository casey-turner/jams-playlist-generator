import { Container } from '@components/Container'

export const Footer = () => {
  return (
    <footer>
      <Container width="full">
        <div className="flex flex-col items-center py-8">
          <p>© 2023 JAMS - AI Playlist Generator</p>
        </div>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'
