# anymem

## Development

This project uses Docker and Docker Compose for development, with Node.js 20 (Debian Bookworm-based image) for both frontend and backend services.

To run the development environment:

1. Ensure you have Docker and Docker Compose installed on your system.
2. Run `make web` in the terminal to start all services.
3. Visit `https://back.anymem.orb.local` to access the backend API.
4. Visit `https://front.anymem.orb.local` to access the frontend application.

This setup uses OrbStack for local HTTPS domains during development. Make sure you have OrbStack installed and configured on your system.

### Services

- Backend: Node.js API running on port 3000
- Frontend: Next.js application running on port 3001
- Mobile: React Native application (accessible through Expo)

### Updating Dependencies

If you need to update dependencies or make changes to the Docker setup:

1. Modify the respective Dockerfile or docker-compose.yml as needed.
2. Rebuild the Docker images with `docker-compose build`.
3. Restart the services with `docker-compose up`.

For more detailed information on each service, refer to their respective directories.
