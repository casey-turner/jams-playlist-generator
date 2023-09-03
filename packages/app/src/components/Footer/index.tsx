import { Container } from '@components/Container'

export const Footer = () => {
  return (
    <footer>
      <Container width="full">
        <div className="flex flex-col items-center py-8">
          <p className="text-cadet-gray font-poppins text-sm font-light">
            © 2023 Jams - AI Playlist Generator
          </p>
        </div>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'
