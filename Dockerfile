FROM node:12.22

WORKDIR /src

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start", '/init.sql']