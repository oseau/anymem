FROM node:20-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

COPY . .

RUN npx tailwindcss init -p

CMD ["npm", "run", "dev"]
