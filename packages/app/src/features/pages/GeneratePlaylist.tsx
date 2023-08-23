import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { Section } from '@components/Section'
import GeneratePlaylistForm from '@features/playlist/components/GeneratePlaylistForm'

const GeneratePlaylist = () => {
  return (
    <>
      <Layout title="Generate Playlist" background="light">
        <Section sectionStyle="contentTop">
          <Container>
            <GeneratePlaylistForm />
          </Container>
        </Section>
      </Layout>
    </>
  )
}

export default GeneratePlaylist
