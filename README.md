# AnyMem

## Development

This project uses Docker and Docker Compose for development, with Node.js 20 (Debian Bookworm-based image) for both frontend and backend services.

To run the development environment:

1. Ensure you have Docker and Docker Compose installed on your system.
2. Run `make web` in the terminal to start all services.
3. Visit [https://back.anymem.orb.local](https://back.anymem.orb.local) to access the backend API.
4. Visit [https://front.anymem.orb.local](https://front.anymem.orb.local) to access the frontend application.

This setup uses OrbStack for local HTTPS domains during development. Make sure you have [OrbStack](https://orbstack.dev/) installed and configured on your system.
