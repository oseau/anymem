# AnyMem

This project is an experimental attempt to develop code primarily using AI tools, specifically Claude and Aider. 

You can view the live preview of the project at [https://anymem.vercel.app](https://anymem.vercel.app). (Rebuilt for every commit)

For production, check [https://anymem.app](https://anymem.app). Please note that this app is under heavy development and is not yet fully functional. Expect things to break and change frequently.

## Development

This project uses Docker and Docker Compose for development, with Node.js 20 (Debian Bookworm-based image) for both frontend and backend services(Next.js).

To run the development environment:

1. Ensure you have Docker and Docker Compose installed on your system.
2. Run `make web` in the terminal to start all services.
3. Visit [https://anymem.orb.local](https://anymem.orb.local) to access the web application.

This setup uses OrbStack for local HTTPS domains during development. Make sure you have [OrbStack](https://orbstack.dev/) installed and configured on your system.
