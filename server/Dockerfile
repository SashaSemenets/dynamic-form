FROM node:lts
WORKDIR /usr/src/app/server
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]

FROM node:10
