FROM node:20-bookworm

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# Initialize Tailwind CSS
RUN npx tailwindcss init -p

CMD ["npm", "run", "dev"]
