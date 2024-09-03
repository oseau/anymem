FROM node:20-bookworm

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

CMD ["npm", "run", "dev"]
