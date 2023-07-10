import { Layout } from '@components/Layout'

const About = () => {
  return (
    <>
      <Layout title="About">
        <div className="flex flex-col items-center">
          <h1 className="mb-8 text-6xl font-bold">About</h1>
          <p className="mb-5 w-1/2 text-center text-xl">
            JAMS is a playlist creation tool powered by AI. With just a few
            simple steps, you can create and save your perfect playlist directly
            to your Spotify account.
          </p>
          <p className="mb-5 w-1/2 text-center text-xl">
            In addition to helping you curate your perfect playlist, JAMS also
            provides you with a selection of playlist title options...because
            sometimes the title is the trickiest part!
          </p>
          <p className="mb-5 w-1/2 text-center text-xl">
            JAMS was built with 💙 by Casey Turner a software developer, music
            lover and playlist geek, based in Brisbane, Australia.
          </p>
        </div>
      </Layout>
    </>
  )
}

export default About
