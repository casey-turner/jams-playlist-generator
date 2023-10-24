import { Container } from '@components/Container'
import { Layout } from '@components/Layout'
import { Section } from '@components/Section'

const Contact = () => {
  return (
    <>
      <Layout title="About">
        <Section>
          <Container>
            <div className="relative text-center  lg:px-10 xl:px-40">
              <h1 className="text-yale-blue mb-5 text-4xl font-extrabold md:text-5xl">
                Contact
              </h1>
              <a
                className="text-gunmetal underline"
                href="https://github.com/casey-turner/"
              >
                My Github
              </a>
            </div>
          </Container>
        </Section>
      </Layout>
    </>
  )
}

export default Contact
