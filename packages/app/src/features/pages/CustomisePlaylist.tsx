import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { Section } from '@components/Section'
import CustomisePlaylistForm from '@features/playlist/components/CustomisePlaylistForm'

const CustomisePlaylist = () => {
  return (
    <>
      <Layout title="Customise Playlist" background="light">
        <Section sectionStyle="contentTop">
          <Container>
            <CustomisePlaylistForm />
          </Container>
        </Section>
      </Layout>
    </>
  )
}

export default CustomisePlaylist
