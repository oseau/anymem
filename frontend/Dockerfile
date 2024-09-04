FROM node:20-bookworm

WORKDIR /usr/src/anymem/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

CMD ["npm", "run", "dev"]
