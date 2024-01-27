#Next.js Dockerfile
FROM node:18 AS builder
WORKDIR /usr/app
COPY . .
RUN npm install
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]