import boston from '@assets/images/boston.jpg'
import casey from '@assets/images/casey.jpg'
import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { Section } from '@components/Section'

const About = () => {
  return (
    <>
      <Layout title="About">
        <Section>
          <Container>
            <div className="relative text-center  lg:px-10 xl:px-40">
              <h1 className="text-yale-blue mb-5 text-4xl font-extrabold md:text-5xl">
                About
              </h1>
              <p className="text-gunmetal mb-4 text-sm md:text-base">
                Jams is a playlist creation tool powered by AI. With just a few
                simple steps, you can create and save your perfect playlist
                directly to your Spotify account.
              </p>
              <p className="text-gunmetal mb-4 text-sm md:text-base">
                In addition to helping you curate your perfect playlist, Jams
                also provides you with a selection of playlist title
                options...because sometimes the title is the trickiest part!
              </p>
              <p className="text-gunmetal mb-4 text-sm md:text-base">
                Jams was built with 💙 by me,{' '}
                <span className="group/casey cursor-pointer underline">
                  Casey Turner,
                  <img
                    src={casey}
                    className="invisible absolute left-1/2 top-1/2 h-52	-translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 ease-in-out group-hover/casey:visible group-hover/casey:opacity-100"
                  />
                </span>{' '}
                (with a little bit of help from my best mate,{' '}
                <span className="group/boston cursor-pointer underline">
                  Boston
                  <img
                    src={boston}
                    className="invisible absolute left-1/2 top-1/2 h-52	-translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-500 ease-in-out group-hover/boston:visible group-hover/boston:opacity-100"
                  />
                </span>
                ). I'm a software developer, based in Brisbane, Australia.{' '}
              </p>
            </div>
          </Container>
        </Section>
      </Layout>
    </>
  )
}

export default About
