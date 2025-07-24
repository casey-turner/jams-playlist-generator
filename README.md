# Jams - AI Playlist Generator

Jams is a web app that leverages OpenAI's Chat GPT to allow users to generate a Spotify playlist and playlist title, based on their selected genre/s of music.

🔗 <a href="https://jamsplaylist.app" target="_blank">https://jamsplaylist.app</a>

## Demo

https://github.com/casey-turner/jams-playlist-generator/assets/30207180/d3949950-fa6e-4a38-9939-3d7f66fa153c

## Tech

Jams is a monorepo project, built using npm Workspaces, and consists of two packages: app and server.

Frontend:

- The frontend was developed using React and Vite.
- Vite was chosen for its fast development server and efficient build process, enhancing the development experience.

Backend:

- The backend was built using Node.js, chosen for its non-blocking, event-driven architecture, making it well-suited for handling asynchronous operations like API requests.
- Express.js, a minimalist web framework for Node.js, is used for routing and middleware management.

Authentication and Security:

- To handle user authentication securely, JSON Web Tokens (JWT) are employed. JWT provides a stateless authentication mechanism and allows for secure transmission of data between parties.
- The use of JWT helps negate the need for a traditional database, enhancing scalability and reducing complexity.
- Sensitive user data, such as Spotify credentials, is securely handled using JWT.

Testing:

- The backend uses Jest as the primary testing framework with TypeScript support via ts-jest.
- Supertest is used for testing HTTP endpoints and API routes.
- Tests are organized by component type (controllers, middlewares, routes, etc.) in the `__tests__` directory.
- Mocking utilities are provided to simulate external dependencies like OpenAI and Spotify APIs.

## Obtaining API Keys

- Spotify - https://developer.spotify.com/documentation/web-api
- OpenAI - https://platform.openai.com/api-keys

## Installation

Install jams-playlist-generator with npm

```bash
  npm install
  // launch the server and app in separate terminals
  npm run dev:server
  npm run dev:app
```

## Running Tests

To run the backend tests:

```bash
  # Run all tests
  npm run -w @playlistify/server test

  # Run tests in watch mode (for development)
  npm run -w @playlistify/server test:watch

  # Run tests with coverage report
  npm run -w @playlistify/server test:coverage
```

## Environment Variables

To run this project, you will need to add the following environment variables. Refer to the relevant `env.example` files for guidance:

**packages/server .env file:**
- `NODE_ENV`
- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REDIRECT_URI`
- `OPENAI_API_KEY`
- `JWT_SECRET`
- `CLIENT_URL`
- `DOMAIN`
- `PORT`

**packages/app .env file:**
- `VITE_API_URL`
- `VITE_DOMAIN`

