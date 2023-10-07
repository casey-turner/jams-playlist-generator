import { Container } from '@components/Container'

export const Footer = () => {
  return (
    <footer>
      <Container width="full">
        <div className="flex flex-col items-center py-4 md:py-8">
          <p className="text-xs font-light text-cadet-gray font-poppins md:text-sm">
            © 2023 Jams - AI Playlist Generator
          </p>
        </div>
      </Container>
    </footer>
  )
}

Footer.displayName = 'Footer'
