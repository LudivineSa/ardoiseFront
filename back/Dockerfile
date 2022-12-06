FROM node:lts-alpine

WORKDIR /app
# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .
COPY prisma prisma
COPY src src
COPY tsconfig.json tsconfig.json
COPY .env .
RUN npm i
#RUN npx prisma migrate dev --name init
# Copy app files
#COPY . .
# Expose port
EXPOSE 4000
# Start the app
#CMD [ "npm", "start" ]